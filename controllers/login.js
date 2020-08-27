const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')




/* GET login page. */ 
router.get('/', function(req, res) { 
    res.render('login'); 
});

router.post('/',function(req, res){
    console.log(req.body);
// Verify req.body Is Not Empty
  // Find One User By Email
  // If No User Found, Respond with 400
  // Compare Password Sent Password and foundUser Password
  // If Passwords Match, Create Session and Respond with 200
  // If Passwords Do Not Match, Respond with 400
  // Find User By Email Address
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Respond with 400 If No User Found
    if (!foundUser) {
      return res.send('No User Found');
    }
    // Compare User Password with foundUser Password
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);
      // Create Session and Respond with 200 If Passwords Match
      if (isMatch) {
        // Create currentUser Object (Hide User Password)
        const currentUser = {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          isLoggedIn: true,
        }
        // Create A New Session and Respond 200
        req.session.currentUser = currentUser;
        res.redirect('profile');
      } else {
        // Respond with 400 If Passwords Do Not Match
        return res.send('Passwords do not match');
      }
    });
  });
});


module.exports = router;