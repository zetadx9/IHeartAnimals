const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4000;


// CONTROLLERS
const sequencesCtrl = require('./controllers/sequencesController')
const posesCtrl = require('./controllers/posesController');

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





// ----------------------------- SERVER LISTENER ------------------------------ //

app.listen(PORT, () => console.log('Server is running on port ${PORT}'));