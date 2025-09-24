const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
   
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;