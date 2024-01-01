const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const connected = require('../middleware/connected');
const auth = require('../middleware/auth');

router.get('/', connected, (req, res) => {
  res.render('logIn', { user: User });
});

router.post('/', async (req, res) => {
  const user = await User.findOne({ userEmail: req.body.userEmail });

  if (!user) return res.status(404).send('Invalid Email or Password');

  const validPassCode = await bcrypt.compare(
    req.body.userPassCode,
    user.userPassCode
  );
  if (!validPassCode) return res.status(404).send('Invalid Email or Password');

  const token = user.generateToken();
  res.cookie('jToken', token, { maxAge: 360000 * 10, httpOnly: true });

  res.status(200).redirect(`/`);
  console.log(token);
});

module.exports = router;
