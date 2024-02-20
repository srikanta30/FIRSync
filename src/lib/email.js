const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const send = async ({ from, to, subject, message }) => {
  try {
    const options = {
      from: from,
      to: to,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    };
    const response = await transporter.sendMail(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = send;
