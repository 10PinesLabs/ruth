import nodemailer from 'nodemailer';
import componerMailResumen from '~/domain/mail/mailParser';

async function enviarResumenPorMail(reunion, temas) {
  const esMailSeguro = () => process.env.MAIL_PORT === '465';

  const fechaReunion = (date) => (
    `${date.getDate().toString()}-${(date.getMonth() + 1).toString()}-${date.getFullYear().toString()}`
  );

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: esMailSeguro(),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let newVar = {
    from: `${process.env.MAIL_SENDER_NAME} <${process.env.MAIL_SENDER_ADRESS}>`,
    to: process.env.MAIL_DESTINATION,
    subject: `Resumen ${reunion.nombre} - ${fechaReunion(reunion.dataValues.updatedAt)}`,
    html: componerMailResumen(reunion, temas, fechaReunion(reunion.dataValues.updatedAt)),
  };
  console.log(newVar)
  await transporter.sendMail(newVar);
}

export default enviarResumenPorMail;
