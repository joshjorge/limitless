const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const connected = require('../middleware/connected');

router.get('/me', auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  res.render('me', { currentUser });
});

router.put('/me', auth, async (req, res) => {
  const currentUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassCode: req.body.userPassCode,
    },
    { new: true }
  );

  currentUser.save();
  res.status(200).send('Updated');
});

router.get('/createAccount', connected, (req, res) => {
  res.render('createAccount', { users: User, user: new User({}) });
});

router.post('/createAccount', async (req, res) => {
  try {
    let isUserExist = await User.findOne({ userEmail: req.body.userEmail });
    if (isUserExist) return res.status(400).send('User already registered.');

    let user = await new User({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassCode: req.body.userPassCode,
    });

    const salt = await bcrypt.genSalt(12);
    user.userPassCode = await bcrypt.hash(user.userPassCode, salt);

    user = await user.save();
    const token = user.generateToken();

    res
      .cookie('jToken', token, { maxAge: 360000 * 10, httpOnly: true })
      .redirect('/');
  } catch (error) {
    res.status(400).send('Something went wrong');
    console.log(error.message);
  }
});

module.exports = router;
