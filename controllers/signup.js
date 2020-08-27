const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

/* GET Signup */ 
router.get('/', function(req, res) { 
    res.render('signup'); 
}); 

router.post('/',function(req, res){
    console.log(req.body);

    //Query the DB to add new user
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return console.log(err);
        // Return Error If Account Already Exists
        if (foundUser) return console.log('User Already Exsists');
        // Generate Hash Salt (This just makes the password hard to crack)
        bcrypt.genSalt(10, (err, salt)=> {
          if (err) return console.log(err);
          // Turn the Plain Text Password Into A Complicated Hash
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return console.log(err);
            // Destructure New User Data From Request
            const { name, email, password } = req.body;
            // Construct New User Object with Hashed Password
            const newUser = {
              name,
              email,
              password: hash, // VERY IMPORTANT! NEVER SAVE PLAIN TEXT PASSWORD
            };
            // Create New User
            db.User.create(newUser, (err, createdUser) => {
              if (err) return console.log(err);
              res.redirect('login');
            });
          });
        });
      });
        
    });      

 
module.exports = router;