const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')

// Current Path = '/animals'

// Animals Index
router.get('/', (req, res) => {
  console.log('Request Session = ', req.session);
  // Query the db for all animals
  db.Animal.find({}, (err, allAnimals) => {
    if (err) return console.log(err);

    // Log all authors
    console.log('All Animals = ', allAnimals);

    // Render the index template with all animals
    res.render('animals/index', {
      animals: allAnimals,
    });
  });
});


// Animals New
router.get('/new', (req, res) => {
  console.log('Req Session = ', req.session);

  if (!req.session.currentUser) return res.redirect('/login');

  res.render('animals/new');
});


// Animals Show
router.get('/:id', (req, res) => {
  // Query the database for the animal by ID
  if (!req.session.currentUser) return res.redirect('/login');

  db.Animal.findById(req.params.id)
    .populate({path: 'articles'})
    .exec((err, foundAnimal) => {
      if (err) return console.log(err);
      res.render('animals/show', {
        animal: foundAnimal,
      });
  })
});


// Animals Create
router.post('/', (req, res) => {
  if (!req.session.currentUser) return res.redirect('/login');
  // Configure bodyParser
  // Query the database to create a new record

  // Log the request body
  console.log('Request body = ', req.body);


  db.Animal.create(req.body, (err, newAnimal) => {
    if (err) return console.log(err);

    // Log the new animal
    console.log('New Animal = ', newAnimal);

    // Redirect animals index
    res.redirect('/animals');
  });
});


// Animals Edit
router.get('/:id/edit', (req, res) => {
  db.Animal.findById(req.params.id, (err, foundAnimal) => {
    if (err) return console.log(err);
    if (!req.session.currentUser) return res.redirect('/login');


    res.render('animals/edit', {
      animal: foundAnimal,
    });
  });
});


// Animal Update
router.put('/:id', (req, res) => {
  // Log the data from client
  console.log('Updated Animal = ', req.body);
  

  db.Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedAnimal) => {
      if (err) return console.log(err);

      res.redirect('/animals');
    }
  );
});


// Animal Destroy
router.delete('/:id', (req, res) => {
  console.log('Deleting Animal ID = ', req.params.id);

  db.Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
    
    if (err) return console.log(err);
    console.log('The deleted animal = ', deletedAnimal);
    
    db.Article.deleteMany({
      _id: {
        $in: deletedAnimal.articles
      }
    }, (err, data) => {
      res.redirect('/animals');
    })
  });
});

module.exports = router;