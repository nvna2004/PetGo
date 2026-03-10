const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter using SMTP (E.g., Gmail, Mailtrap, etc.)
  // Cấu hình ở đây dùng Gmail, bạn cần cung cấp EMAIL_USER và EMAIL_PASS trong file .env
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password) của Gmail
    },
  });

  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Hỗ trợ gửi template HTML cho đẹp
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
