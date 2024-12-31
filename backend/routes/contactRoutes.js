// routes/contactRoutes.js
const express = require('express');
const { createContact, getAllContacts  , deleteContact} = require('../controllers/contactController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

// POST request to send a new contact form submission
router.post('/create-contact', createContact);

// GET request to retrieve all contact form submissions (admin only)
router.get('/all-contact',auth , adminAuth, getAllContacts);

// DELETE request to delete a contact by ID (admin only)
router.delete('/delete-contact/:id', auth , adminAuth,  deleteContact);

module.exports = router;
