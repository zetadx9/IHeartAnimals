const express = require('express');
const router = express.Router();
const db = require('../models');

// CURRENT PATH = '/profile

router.get('/', (req, res) => {
  db.User.findById(req.session.currentUser._id, (err, foundUser) => {
    if (err) return console.log(err);

    res.render('users/profile', {
      user: foundUser,
    });
  });
});

module.exports = router;