const express = require('express');
const router = express.Router();
const db = require("../models");

/* GET Profile page. */ 
router.get('/',function(req, res) { 
    res.render('profile'); 
}); 

/* GET Logout Page */ 
router.get('/', function(req, res) { 
    req.logout(); 
    res.redirect('login'); 
}); 
module.exports = router;