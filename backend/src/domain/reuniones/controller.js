import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';
import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';
import { RequestError } from '~/utils/asyncMiddleware';

function validarReunionRapida(body) {
  const { tema, autor, nombre } = body;
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

export async function generarReunion(body) {
  switch (body.tipo) {
    case 'roots': {
      const temas = await VotacionDeRoots.getTemasRoots();
      const reunion = { abierta: body.abierta, nombre: 'Reunion de Roots', configuracion: { tipo: body.tipo } };
      return { temas, reunion };
    }
    case 'rapida': {
      validarReunionRapida(body);
      const temas = [crearTema(body.tema, body.descripcion, body.urlDePresentacion, body.autor)];
      const reunion = {
        abierta: body.abierta,
        nombre: body.nombre,
        configuracion: { tipo: body.tipo },
      };
      return { temas, reunion };
    }
    default: {
      throw new RequestError(400, 'No existe ese tipo de reunion');
    }
  }
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
    const { temas, reunion } = await generarReunion(req.body);
    const reunionCreada = await repoReuniones.create(reunion);
    const temasNuevos = await repoTemas.guardarTemas(reunionCreada, temas);
    return { ...(reunionCreada.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta, temas, id } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(id);
    if (!reunionAActualizar.abierta) {
      throw new RequestError(400, 'No se puede actualizar una reunion cerrada');
    }
    await reunionAActualizar.update({ abierta });

    if (!abierta) {
      await enviarResumenPorMail(reunionAActualizar, req.body.temas);
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

});
export default ReunionController;
