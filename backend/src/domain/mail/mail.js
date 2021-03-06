import nodemailer from 'nodemailer';
import componerMailResumen from '~/domain/mail/mailParser';

async function enviarResumenPorMail(mail, reunion, temas) {
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

  await transporter.sendMail({
    from: `${process.env.MAIL_SENDER_NAME} <${process.env.MAIL_SENDER_ADDRESS}>`,
    to: mail,
    subject: `Resumen ${reunion.nombre} - ${fechaReunion(reunion.dataValues.updatedAt)}`,
    html: componerMailResumen(reunion, temas, fechaReunion(reunion.dataValues.updatedAt)),
  });
}

export default enviarResumenPorMail;
