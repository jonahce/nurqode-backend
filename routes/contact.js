const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();
const { sendContactNotification } = require('../emailService');

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, country, message, projectType } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      country,
      message,
      projectType: projectType || 'web-development'
    });

    await contact.save();

    // Send email notification
    await sendContactNotification({
    name, email, phone, country, message, projectType
    });

    res.status(201).json({
    message: 'Contact form submitted successfully',
    contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email
    }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contact submissions (for admin)
router.get('/submissions', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;