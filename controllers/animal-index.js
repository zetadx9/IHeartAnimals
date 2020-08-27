const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

/* GET Signup */ 
router.get('/', function(req, res) { 
    res.render('animal-index'); 
}); 


module.exports = router;