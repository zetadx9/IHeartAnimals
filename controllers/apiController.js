const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

// Database
const db = require('../models');

// CURRENT PATH + '/api/v1'

// API ROUTES ALWAYS RESPOND WITH JSON

router.get('/animals', (req, res) => {
  console.log('ANIMALS API HIT...');
  // Get All Animals from DB
  db.Animal.find({}, (err, allAnimals) => {
    if (err) res.status(400).json(err);

    res.json(allAnimals);
  });
});

router.delete('/animals/:id', (req, res) => {
  db.Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
    if (err) return res.json(err);

    res.json({success: true})
  });
});


module.exports = router;