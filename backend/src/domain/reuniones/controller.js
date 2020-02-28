import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';

const ReunionController = ({ reunionesRepo: repoReuniones, temasRepo: repoTemas }) => ({
  reunion: async () => {
    const reunion = await repoReuniones.findLastCreated();
    if (!reunion) {
      return { abierta: false };
    }

    const temas = await repoTemas.findTemasDeReunion(reunion.id);

    return { ...(reunion.toJSON()), temas: temas.map((t) => t.toJSON()) };
  },

  crear: async (req) => {
    const { abierta } = req.body;
    const temas = await VotacionDeRoots.getTemasRoots();
    const reunion = await repoReuniones.create({ abierta });
    const temasNuevos = await repoTemas.guardarTemas(reunion, temas);
    return { ...(reunion.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta } = req.body;

    const reunionAActualizar = await repoReuniones.findLastCreated();
    await reunionAActualizar.update({ abierta });
  },

});

export default ReunionController;
