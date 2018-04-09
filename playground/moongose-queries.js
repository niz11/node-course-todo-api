const {ObjectID} = require('mongodb');
const{mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

//Id from databese
var id = '5aca7dc121b8141410bd18f8';
var id2 = '5aca7dc121b8141410bd18f';
if (!ObjectID.isValid(id))
  return console.log('Id not Valid - Todos');
//quieres technique
Todo.find({ // brings array back
  _id: id // Mongoose can handel ids as strings
}).then((todos)=>{
  console.log('Todo', todos);
});

//brings an object back. brings back null if id is not found
Todo.findOne({ //bring the first much
  _id: id // Mongoose can handel ids as strings
}).then((todo)=>{
  console.log('Todo', todo);
});
//brings an object back. brings back null if id is not found
Todo.findById(id).then((todo)=>{
  if(!todo)
    return console.log('Id not found');
  console.log('Todo by id', todo);
})//.catch((e)=>console.log(e)); - that can handel invalid ids

// Chalange - quering the Users collection

var id3 = '5ac76fb494588f600d60e987';
if(!ObjectID.isValid(id3))
  return console.log('Invalid id - User');

User.findById(id3).then((user)=>{
  if(!user)
    return console.log('Id not found');
  console.log('User by Id', JSON.stringify(user));
});
