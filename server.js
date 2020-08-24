const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4000;


// CONTROLLERS


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

// ------------------------------ ROUTES -------------------------------------- //

// Home (Root) Route
app.get('/', (req, res) => {
    res.render('index');
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});


// Signup Route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Home (Root) Route
app.get('/sea', (req, res) => {
    res.render('seaworld');
});


// Home (Root) Route
app.get('/pets', (req, res) => {
    res.render('house');
});


// ----------------------------- SERVER LISTENER ------------------------------ //

app.listen(PORT, () => console.log('Server is running on port ${PORT}'));