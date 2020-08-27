const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/iheartanimals';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`))

// --- EXPORT MODELS --- //
module.exports = {
    Animal: require('./Animal'),
    Article: require('./Article'),
    User: require('./User'),
  };
