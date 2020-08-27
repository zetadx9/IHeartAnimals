const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

/* GET Signup */ 
router.get('/', (req, res) => {
    // Query the database for the author by ID
    db.Author.findById(req.params.id)
      .populate({path: '/'})
      .exec((err, foundAnimal) => {
        if (err) return console.log(err);
        res.render('animal-show', {
          animal: foundAnimal,
        });
    })
  });
  

module.exports = router;