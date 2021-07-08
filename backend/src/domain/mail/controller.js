import enviarResumenPorMail from '~/domain/mail/mail';

const MailController = ({ reunionesRepo: repoReuniones }) => ({
  reenviarMailMinuta: async (req) => {
    const { mail, temasReunion, idReunion } = req.body;
    const reunionAActualizar = await repoReuniones.findOneById(idReunion);
    await enviarResumenPorMail(mail, reunionAActualizar, temasReunion);
  },

});
export default MailController;
