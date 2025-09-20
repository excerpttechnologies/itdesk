const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, website, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Please fill all required fields." });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error) => {
      if (error) console.error("SMTP Error:", error);
      else console.log("SMTP ready");
    });

    const mailOptions = {
      from: `"Excerpt Trainings" <${process.env.EMAIL_USER}>`,
      to: "excerpt.trainings@gmail.com", // Target email
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Website:</strong> ${website || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error in contact form:", error);
    return res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

module.exports = router;
