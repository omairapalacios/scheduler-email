const nodemailer = require("nodemailer");

async function sendEmail(user, buffer){
  const filename = `informe${new Date()}.xlsx`;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", //smtp.gmail.com  //in place of service use host...
      secure: false, //true
      port: 25, //465
      auth: {
          user: 'email@gmail.com',
          pass: 'password',
      },
      tls: {
        rejectUnauthorized: false,
    },
    });
  const mailOptions = {
      from: 'email@gmail.com',
      to: `${user.email}`,
      subject: 'POC PROGRAMACION DE TAREAS',
      html:  `<html>
      <h4>${user.nombres}, este es una POC de la programación automatica de tareas usando Cloud Functions, /Pub/Sub y Google Scheduler 😄</h4>
      </html>`,
      attachments: [
          {
              filename,
              content: buffer,
              contentType:
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
      ],
  };
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente")
  } catch (error) {
    console.log('ocurrio un error, no se envió correo', error)
  }
}

module.exports = {
  sendEmail
}
