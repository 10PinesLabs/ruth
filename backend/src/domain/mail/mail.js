import componerMailResumen from '~/domain/mail/mailParser';

const nodemailer = require('nodemailer');
const { markdown } = require('nodemailer-markdown');

async function enviarResumenPorMail(reunion, temas) {
  const esMailSeguro = () => process.env.MAIL_PORT === 465;
  const getMailService = () => (process.env.MAIL_PORT === 465 ? 'Gmail' : '');

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

  const info = await transporter.sendMail({
    from: '"Ruth 👻" <votacionroots@gmail.com>',
    to: process.env.MAIL_DESTINATION,
    subject: 'Hello ✔',
    markdown: componerMailResumen(reunion, temas),
  });
  // eslint-disable-next-line no-console
  console.log('Message sent: %s', info.messageId);
}

export default enviarResumenPorMail;
