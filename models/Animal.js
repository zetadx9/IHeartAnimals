const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cardImage1: {
    type: String,
    required: true,
  },
  cardImage2: {
    type: String,
    required: true,
  },
  cardImage3: {
    type: String,
    required: true,
  },
  descript: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }]
}, {timestamps: true});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;