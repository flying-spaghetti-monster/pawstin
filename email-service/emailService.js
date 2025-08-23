const amqp = require("amqplib");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const queueName = "emailQueue";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log(transporter)

async function start() {
  try {
  const connection = await amqp.connect('amqp://guest:guest@localhost:5672/');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    console.log("📩 Email service waiting for messages...");

    channel.consume(queueName, async (msg) => {
      if (!msg) return;

      const emailData = JSON.parse(msg.content.toString());
      console.log("📨 New email task:", emailData);

      try {
        let subject, text;

        if (emailData.type === "registration") {
          subject = "Welcome to our service!";
          text = `Hi ${emailData.name}, thank you for registering`;
        } else if (emailData.type === "resetPassword") {
          subject = "Password Reset";
          text = `Hello! ${emailData.name} . To reset your password, please use the token: ${emailData.token}`;
        } else {
          subject = emailData.subject || "Message from our service";
          text = emailData.text || "No content.";
        }

        await transporter.sendMail({
          from: `"My App" <${process.env.EMAIL_USER}>`,
          to: emailData.to,
          subject,
          text,
        });

        console.log(`✅ Email sent to ${emailData.to}: ${subject}`);
        channel.ack(msg);
      } catch (err) {
        console.error("❌ Error sending email:", err);

        channel.nack(msg, false, true);
      }
    });
  } catch (error) {
    console.error("❌ RabbitMQ connection error:", error);
    setTimeout(start, 5000); // retry підключення через 5 сек
  }
}

start();
