const mongoose = require('mongoose');
const tvShowSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    actors: [{
      type: String,
      required: true,
    }],
    creators: [{
      type: String,
      required: true,
    }],
    
    seasons: {
      type: Number,
      required: true,
    }, 
     runtime:{
      type: Number,
      required: true,
    },
  
  });
  
  const TVShow = mongoose.model('TVShow', tvShowSchema);
  
  module.exports = TVShow;
