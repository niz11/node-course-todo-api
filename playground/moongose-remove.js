const {ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

// Todo.remove({}) // deleting all. Can't just send a null, have to send {}
// geting a res object back
// Todo.remove({}).then((res)=>{
//   console.log(res);
// });

// Another way -
// both return the doc
//Todo.findOneAndRemove - Can use quering variables
// Todo.findByIdAndRemove
Todo.findByIdAndRemove({_id: '5ace27e3728fd7291fbb2a42'}).then((todo)=>{
  console.log(todo);
});

// Todo.findByIdAndRemove('5ace273f728fd7291fbb2a05').then((todo)=>{
//   console.log(todo);
// });
