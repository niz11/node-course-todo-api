var mongoose = require('mongoose');
// Spec the models
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    require:true, // validators - must hava a text filed and must be longer than ''
    minlength: 1,
    trim: true // Take spaces away
  },
  completed: {
    type : Boolean,
    default: false
  },
  completedAt: {
    type: Number ,
    default: null
  }
});

module.exports ={
  Todo
};
