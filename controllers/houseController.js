const express = require('express');
const router = express.Router();
const db = require("../models");

/* GET Profile page. */ 
router.get('/',function(req, res) { 
    res.render('house'); 
}); 

module.exports = router;