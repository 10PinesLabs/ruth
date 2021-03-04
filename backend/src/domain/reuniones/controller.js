import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';
import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';

function crearTema(tema, descripcionDelTema, urlDePresentacion) {
  return {
    tipo: 'conDescripcion',
    titulo: tema,
    descripcion: descripcionDelTema || 'Sin descripcion',
    duracion: 'CORTO',
    autor: 'Root',
    obligatoriedad: 'NO_OBLIGATORIO',
    linkDePresentacion: urlDePresentacion || '',
    propuestas: null,
    temasParaRepasar: null,
    cantidadDeMinutosDelTema: 30,
    prioridad: 1,
    mailDelAutor: 'santiagoparedes97@gmail.com',
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
    const { tema } = req.body;
    const descripcionDelTema = req.body.descripcion;
    const { urlDePresentacion } = req.body;

    const { abierta } = req.body;
    const temas = esReunionDeRoots
      ? await VotacionDeRoots.getTemasRoots()
      : [crearTema(tema, descripcionDelTema, urlDePresentacion)];
    const reunion = await repoReuniones.create({ abierta });
    const temasNuevos = await repoTemas.guardarTemas(reunion, temas);
    return { ...(reunion.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta, temas, id } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(id);
    await reunionAActualizar.update({ abierta });

    if (!abierta) {
      notificador.notificarOwnersDeActionItemsDeReunion(temas);
      await enviarResumenPorMail(reunionAActualizar, req.body.temas);
    }
  },

});

export default ReunionController;
