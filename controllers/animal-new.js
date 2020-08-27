const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

// Authors New
router.get('/', (req, res) => {
    console.log('Req Session = ', req.session);
  
    if (!req.session.currentUser) return res.redirect('login');
  
    res.render('animal-new');
  });
  
// Authors Create
router.post('/', (req, res) => {
    if (!req.session.currentUser) return res.redirect('login');
    // Configure bodyParser
    // Query the database to create a new record
  
    // Log the request body
    console.log('Request body = ', req.body);
  
  
    db.Animal.create(req.body, (err, newAnimal) => {
      if (err) return console.log(err);
  
      // Log the new author
      console.log('New Author = ', newAnimal);
  
      // Redirect authors index
      res.redirect('animal-index');
    });
  });
  

module.exports = router;