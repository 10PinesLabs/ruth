import componerMailResumen from '~/domain/mail/mailParser';

const nodemailer = require('nodemailer');
const { markdown } = require('nodemailer-markdown');

async function enviarResumenPorMail(reunion, temas) {
  const esMailSeguro = () => process.env.MAIL_PORT === '465';
  const getMailService = () => (process.env.MAIL_PORT === '465' ? 'Gmail' : '');

  const fechaReunion = (date) => date.getDate().toString().concat(`-${
    (date.getMonth() + 1).toString()}`).concat(`-${
    date.getFullYear().toString()}`);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: getMailService(),
    secure: esMailSeguro(),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transporter.use('compile', markdown());

  await transporter.sendMail({
    from: `<${process.env.MAIL_SENDER_ADRESS}>`,
    to: process.env.MAIL_DESTINATION,
    subject: `Resumen Roots - ${fechaReunion(reunion.dataValues.updatedAt)}`,
    markdown: componerMailResumen(reunion, temas, fechaReunion(reunion.dataValues.updatedAt)),
  });
}

export default enviarResumenPorMail;
