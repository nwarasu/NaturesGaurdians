const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  status: String,
  location: String,
  description: String,
  photos: [String]
});

module.exports = mongoose.model('Species', speciesSchema);
