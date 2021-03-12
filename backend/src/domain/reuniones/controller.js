import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';
import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';

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
    const { tema } = req.body;
    const { urlDePresentacion, descripcion, autor } = req.body;

    const { abierta } = req.body;
    const temas = esReunionDeRoots
      ? await VotacionDeRoots.getTemasRoots()
      : [crearTema(tema, descripcion, urlDePresentacion, autor)];
    const reunion = await repoReuniones.create({ abierta });
    const temasNuevos = await repoTemas.guardarTemas(reunion, temas);
    return { ...(reunion.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta, temas, id } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(id);
    await reunionAActualizar.update({ abierta });

    if (!abierta) {
      await enviarResumenPorMail(reunionAActualizar, req.body.temas);
      notificador.notificarOwnersDeActionItemsDeReunion(temas);
    }
  },

  obtenerAbiertas: async () => {
    const reuniones = await repoReuniones.findAllOpened();
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
