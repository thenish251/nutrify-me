const mongoose = require('mongoose'); 
const User = require('../model/User');

const mealSchema = mongoose.Schema({
   userId: {
        type: String,
        required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    calorie: {
      type: Number,
      required: true
    },
    isInDayLimit: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: Date.now
    },
  });
  
  module.exports = mongoose.model('Meal', mealSchema);