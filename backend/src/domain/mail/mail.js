import nodemailer from 'nodemailer';
import componerMailResumen from '~/domain/mail/mailParser';

async function enviarResumenPorMail(reunion, temas) {

  const esMailSeguro = () => process.env.MAIL_PORT === '465';

  const fechaReunion = (date) => (
    `${date.getDate().toString()}-${(date.getMonth() + 1).toString()}-${date.getFullYear().toString()}`
  );

  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: esMailSeguro(),
    requireTLS: true,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `${process.env.MAIL_SENDER_NAME} <${process.env.MAIL_SENDER_ADRESS}>`,
    to: process.env.MAIL_DESTINATION,
    subject: `Resumen ${reunion.nombre} - ${fechaReunion(reunion.dataValues.updatedAt)}`,
    html: componerMailResumen(reunion, temas, fechaReunion(reunion.dataValues.updatedAt)),
  });
}

export default enviarResumenPorMail;
