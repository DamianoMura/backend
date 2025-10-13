require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendConfirmationEmail = async (to, nome) => {
  const info = await transporter.sendMail({
    from: '"NerdNest" <no-reply@nerdnest.com>', // nome del sito nel campo From
    to,
    subject: 'Conferma ordine (Mailtrap)',
    html: `
      <div style="font-family:Arial, sans-serif; padding:20px; background:#f9f9f9;">
        <h2 style="color:#9F2E8C;">Ordine Confermato!</h2>
        <p>Ciao <b>${nome}</b>,</p>
        <p>Il tuo ordine è stato ricevuto con successo.</p>
        <p style="font-size:14px; color:#9F2E8C;">Grazie per aver acquistato da noi!</p>
        <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;">
        <p style="font-size:12px; color:#9F2E8C;">Email inviata da <b>NerdNest</b></p>
      </div>
    `
  });

  console.log('Email di test inviata:', info.messageId);
};

module.exports = { sendConfirmationEmail };
