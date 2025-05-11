const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Start Game
router.post('/start', auth, async (req, res) => {
  const { betAmount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.balance < betAmount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    user.balance -= betAmount;
    await user.save();
    // Simulate crash point
    const crashPoint = (Math.random() * (10 - 1.5) + 1.5).toFixed(2);
    res.json({ crashPoint });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Cash Out
router.post('/cashout', auth, async (req, res) => {
  const { betAmount, multiplier } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const winnings = betAmount * multiplier;
    user.balance += winnings;
    await user.save();
    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
￼Enter
