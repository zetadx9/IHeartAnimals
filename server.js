const express = require('express');
const methodOverride = require('method-override');
   // ODM With Mongoose 
const session = require('express-session');
const redisStore = require('connect-redis')(session);
require('dotenv').config();
const mongoose = require('mongoose'); 
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config()


// connect Mongoose to your DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/iheartanimals');



// CONTROLLERS
const animalsCtrl = require('./controllers/animalsController');
const articlesCtrl = require('./controllers/articlesController');
const authCtrl = require('./controllers/authController');
const usersCtrl = require('./controllers/usersController');
const apiCtrl = require('./controllers/apiController');


// VIEW ENGINE
app.set('view engine', 'ejs');





// ----------------------------- MIDDLEWARE ------------------------------------- //

//app.use(express.static(`$(_dirname)/public`));
app.use(express.static(__dirname + '/public'));





// Method Override
app.use(methodOverride('_method'));

// Express BodyParser 
app.use(express.urlencoded({extended: false}));

// Custom Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`);
    next();
  });
  

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Do you want to resave on every request
    saveUninitialized: false, // Track unathenticated users
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // expires in 2 weeks
    }
  }));
// ------------------------------ ROUTES -------------------------------------- //

// Home (Root) Route
app.get('/', (req, res) => {
    res.render('index');
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// Home (Root) Route
app.get('/sea', (req, res) => {
    res.render('seaworld');
});


// Home (Root) Route
app.get('/pets', (req, res) => {
    res.render('house');
});

// Auth Routes
app.use('/', authCtrl);

// Authors Routes
app.use('/animals', animalsCtrl);

// Articles Routes
app.use('/articles', articlesCtrl);

// Users Routes
app.use('/profile', usersCtrl);

// API Routes
app.use('/api/v1', apiCtrl);


// ----------------------------- SERVER LISTENER ------------------------------ //

app.listen(process.env.PORT || 3000)
