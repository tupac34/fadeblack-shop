const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  const { to, subject, text } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
