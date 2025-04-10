const nodemailer = require("nodemailer");

exports.handler = async function(event) {
  const { type, user, details } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = "";
  let text = "";

  if (type === "signup") {
    subject = `🆕 New Signup - ${user.email}`;
    text = `A new user signed up: ${user.email}`;
  } else if (type === "order") {
    subject = `📦 New Order - ${user.email}`;
    text = `New order placed by ${user.email}\nItems:\n`;
    details.forEach(item => {
      text += `- ${item.name} x${item.quantity} @ R${item.price}\n`;
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "orders@fadeblack.co.za",
      subject,
      text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
