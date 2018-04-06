var mongoose = require('mongoose');
// Spec the models
var User = mongoose.model('User', {
  text: {
    type: String,
    require:true, // validators - must hava a text filed and must be longer than ''
    minlength: 1,
    trim: true // Take spaces away
  }
});

module.exports ={
  User
};
