const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model

// GET all users
router.get('/userData', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;