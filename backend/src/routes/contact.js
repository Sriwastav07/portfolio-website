import express from 'express';
import Contact from '../models/Contact.js';


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
