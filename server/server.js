var mongoose = require('mongoose');
// Confuguring the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Spec the models
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type : Boolean
  },
  completedAt: {
    type: Number
  }
});
// New todo
var newTodo = new Todo({
  text: "Cook dinner"
});

// Another one
var secTodo = new Todo({
  text: "Just hanging" ,
  completed : true ,
  completedAt : 22
});
// Ssave to the database
newTodo.save().then((doc)=>{
  console.log('Saved Todo' , doc);
}, (e)=>{
  console.log("Can't connect");
})
secTodo.save().then((doc)=>{
  console.log(JSON.stringify(doc , undefined , 2));
}, (e)=>{
  console.log("Can't connect");
})
