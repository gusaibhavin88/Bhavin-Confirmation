const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const icsContent = fs.readFileSync("1712839024397.jpg");

// this function is used for the send email
const sendEmail = async (payload) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: payload.email,
    subject: payload.subject,
    html: payload.message,
    attachments: [
      {
        filename: "event.ics", // Name of the attachment
        content: icsContent, // Content of the iCalendar file
        encoding: "utf8", // Encoding type of the attachment content
        method: "request",
        contentType: "text/calendar",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  return;
};

module.exports = sendEmail;
