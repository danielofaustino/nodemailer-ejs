const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendEmail = (email, userClient, pms, errorMessage) => {
  ejs.renderFile(
    __dirname + '/templates/email.ejs',
    { userClient, pms, errorMessage },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          service: 'Outlook365',
          auth: { user: '', pass: '' },
          tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: 'suporte@fastprobr.com',
          to: email.destination,
          subject: email.subject,
          html: data,
        };

        if (process.env.NODE_ENV !== 'development') {
          transporter.sendMail(mailOptions, (error) => {
            if (error) {
              console.log(error);
              throw new Error('Something wrong just happen, email not sent!');
            } else {
              console.log('Email successfully sent!');
            }
          });
        }
      }
    }
  );
};

const email = {
  destination: 'danieloliveirafaustino@gmail.com',
  subject: 'Teste Template EJS',
};

const userClient = { email: 'danieloliveirafaustino@gmail.com' };
const pms = 'Lamsa';
const errorMessage = [
  '<li> Erro 1 </li>',
  '<li> Erro 2 </li>',
  '<li> Erro 3 </li>',
];

sendEmail(email, userClient, pms, errorMessage);

module.exports = {
  sendEmail,
};
