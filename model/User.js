const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     username: {
       type: String,
       required: true
     },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
          type: String,
          requires: true,
          min: 6
      },
      max_calories: {
          type: Number,
          default: 0
      },
      createdDate: {
          type: Date,
          default: Date.now
      },
});

module.exports = mongoose.model('User', userSchema);