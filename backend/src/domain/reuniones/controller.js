import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';
import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';
import { RequestError } from '~/utils/asyncMiddleware';
import context from '~/context';

function validarReunionRapida(req) {
  const { tema, autor, nombre } = req.body;
  if (tema === '' || nombre === '' || autor === '') {
    throw new RequestError(400, 'Faltan campos en la reunion');
  }
}


function crearTema(tema, descripcionDelTema, urlDePresentacion, autor) {
  return {
    tipo: 'conDescripcion',
    titulo: tema,
    descripcion: descripcionDelTema || 'Sin descripcion',
    duracion: 'CORTO',
    autor: autor || 'Root Generico',
    obligatoriedad: 'NO_OBLIGATORIO',
    linkDePresentacion: urlDePresentacion || '',
    propuestas: null,
    temasParaRepasar: null,
    cantidadDeMinutosDelTema: 30,
    prioridad: 1,
    mailDelAutor: 'roots@10pines.com',
  };
}

const ReunionController = ({ reunionesRepo: repoReuniones, temasRepo: repoTemas }) => ({
  reunion: async (req) => {
    const { id } = req.params;
    const reunion = await repoReuniones.findOneById(id);
    if (!reunion) {
      return { abierta: false };
    }

    const temas = await repoTemas.findTemasDeReunion(reunion.id);

    return { ...(reunion.toJSON()), temas: temas.map((t) => t.toJSON()) };
  },

  crear: async (req) => {
    const esReunionDeRoots = req.body.reunionDeRoots;
    if (!esReunionDeRoots) {
      validarReunionRapida(req);
    }
    const {
      tema, urlDePresentacion, descripcion, autor, nombre,
    } = req.body;

    const { abierta } = req.body;
    const nombreDeReunion = esReunionDeRoots ? 'Reunion de Roots' : nombre;
    const temas = esReunionDeRoots
      ? await VotacionDeRoots.getTemasRoots()
      : [crearTema(tema, descripcion, urlDePresentacion, autor)];
    const reunion = await repoReuniones.create({ abierta, nombre: nombreDeReunion });
    const temasNuevos = await repoTemas.guardarTemas(reunion, temas);
    return { ...(reunion.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta, temas, id } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(id);
    if (!reunionAActualizar.abierta) {
      throw new RequestError(400, 'No se puede actualizar una reunion cerrada');
    }
    await reunionAActualizar.update({ abierta });

    if (!abierta) {
      await enviarResumenPorMail(process.env.MAIL_DESTINATION, reunionAActualizar, req.body.temas);
      notificador.notificarOwnersDeActionItemsDeReunion(temas);
    }
  },

  obtenerReuniones: async (req) => {
    const estaAbierta = req.query.estaAbierta.toLowerCase() === 'true';
    const reuniones = await repoReuniones.findAllWhereOpened(estaAbierta);
    const reunionesPromises = reuniones.map(async (reunion) => {
      // Terrible N+1, sacar esto a futuro :)
      const temas = await repoTemas.findTemasDeReunion(reunion.id);

      return { ...reunion.toJSON(), temas };
    });
    const reunionesConTemas = await Promise.all(reunionesPromises);
    return { reuniones: reunionesConTemas };
  },

  obtenerEventos: async (req) => {
    const { idReunion } = req.params;
    const eventosDeReunion = await context.eventosRepo.findEventosParaReunion(undefined, idReunion);
    return { eventos: eventosDeReunion };
  },

  reenviarMailMinuta: async (req) => {
    const { mail, temasReunion, idReunion } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(idReunion);
    await enviarResumenPorMail(mail, reunionAActualizar, temasReunion);
  },

});
export default ReunionController;
