import VotacionDeRoots from '../votacionDeRoots/votacionDeRoots';
import enviarResumenPorMail from '~/domain/mail/mail';
import notificador from './notificador';
import actualizarTemaTratadoEnRoots from './actualizadorMinutaRoots';

const ReunionController = ({ reunionesRepo: repoReuniones, temasRepo: repoTemas }, requester) => ({
  reunion: async () => {
    const reunion = await repoReuniones.findLastCreated();
    if (!reunion) {
      return { abierta: false };
    }

    const temas = await repoTemas.findTemasDeReunion(reunion.id);

    return { ...(reunion.toJSON()), temas: temas.map((t) => t.toJSON()) };
  },

  crear: async (req) => {
    const ultimaReunion = await repoReuniones.findLastCreated();
    if (ultimaReunion && ultimaReunion.abierta) {
      const temasUltimaReunion = await repoTemas.findTemasDeReunion(ultimaReunion.id);
      return { ...(ultimaReunion.toJSON()), temas: temasUltimaReunion };
    }
    const { abierta } = req.body;
    const temas = await VotacionDeRoots.getTemasRoots();
    const reunion = await repoReuniones.create({ abierta });
    const temasNuevos = await repoTemas.guardarTemas(reunion, temas);
    return { ...(reunion.toJSON()), temas: temasNuevos.map((t) => t.toJSON()) };
  },

  actualizar: async (req) => {
    const { abierta, temas } = req.body;

    const reunionAActualizar = await repoReuniones.findLastCreated();
    await reunionAActualizar.update({ abierta });

    if (!abierta) {
      notificador.notificarOwnersDeActionItemsDeReunion(temas);
      //await enviarResumenPorMail(reunionAActualizar, req.body.temas);
      await req.body.temas.forEach(tema => actualizarTemaTratadoEnRoots(requester, tema));
    }
  },

});

export default ReunionController;
