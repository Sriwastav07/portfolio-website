import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from "nodemailer";

const router = express.Router();

// POST /api/contact — save a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic presence validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ✅ Email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `
      });

    res.status(201).json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
  } catch (err) {
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// GET /api/contact — retrieve all messages (protected in prod)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

export default router;
