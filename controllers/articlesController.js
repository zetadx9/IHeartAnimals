const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hash = require('hash')
const db = require('../models/')
// Database
const db = require('../models');


// Articles Index
router.get('/', (req, res) => {
  db.Animal.find({}, (err, allArticles) => {
    if (err) return console.log(err);

    console.log(allArticles);

    res.render('articles/index', {
      articles: allArticles,
    });
  });
});


// Articles New
router.get('/new', (req, res) => {
  db.Animal.find({}, (err, animals) => {
    if (err) console.log(err);
    res.render('articles/new', {animals});
  })
});


// Articles Create
router.post('/', (req, res) => {
  console.log(req.body);
  db.Article.create(req.body, (err, newArticle) => {
    if (err) return console.log(err);

    console.log(newArticle);
    db.Animal.findById(req.body.animalId, (err, foundAnimal) => {
      foundAnimal.articles.push(newArticle);
      foundAnimal.save((err, savedAnimal) => {
        console.log('savedAnimal: ', savedAnimal);
        res.redirect('/articles');
      })
    })
  });
});


// Articles Show
router.get('/:id', (req, res) => {
  db.Animal.findOne({'articles': req.params.id})
    .populate({
      path: 'articles',
      match: {_id: req.params.id}
    })
    .exec((err, foundAnimal) => {
      console.log('animal: ', foundAnimal);
      res.render('articles/show', {
        article: foundAnimal.articles[0],
        animal: foundAnimal
      });
    })
});


// Articles Edit
router.get('/:id/edit', (req, res) => {
  db.Animal.find({}, (err, allAnimals) => {
    db.Animal.findOne({'articles': req.params.id})
      .populate({
        path: 'articles',
        match: {_id: req.params.id}
      })
      .exec((err, foundArticleAnimal) => {
        res.render('./articles/edit', {
          article: foundArticleAnimal.articles[0],
          animals: allAnimals,
          articleAnimal: foundArticleAnimal
        })
    })
  })
});

// Articles Update
router.put('/:id/', (req, res) => {
  db.Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedArticle) => {
    if (err) return console.log(err);
    db.Animal.findOne({'articles': req.params.id}, (err, foundAnimal) => {
      if (foundAnimal._id.toString() !== req.body.animalId){
        foundAnimal.articles.remove(req.params.id);
        foundAnimal.save((err, savedAnimal) => {
          db.Animal.findById(req.body.animalId, (err, newAnimal) => {
            newAnimal.articles.push(updatedArticle);
            newAnimal.save((err, savedNewAnimal) => {
              res.redirect(`/articles/${req.params.id}`);
            })
          })
        })
      } else {
        res.redirect(`/articles/${req.params.id}`); // redirect to articles show route
      }
    })
  });
});


// Articles Destroy
router.delete('/:id', (req, res) => {
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) return console.log(err);
    console.log(deletedArticle);
    db.Animal.findOne({'articles': req.params.id}, (err, foundAnimal) => {
      foundAnimal.articles.remove(req.params.id);
      foundAnimal.save((err, updatedAnimal) => {
        console.log(updatedAnimal);
        res.redirect('/articles');
      })
    })
  });
});


module.exports = router;