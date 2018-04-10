// External imports
var express = require('express');
var bodyParser = require('body-parser');


// local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000 ;

app.use(bodyParser.json()); // can Send json to our app now
// Crud - creat ,read , update and delete

// Creat new todo
app.post('/todos', (req,res)=>{
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc)=>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });

// // If I send a post usl from user, I'll get in the termial what json file I wrote and sent in postman
//   console.log(req.body);
});

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({
      todos // It's got not sending todos as an array! we send it as an object, and in the future we can work with it.
    });
  }, (e)=>{
    res.status(400).send(e);
  })
})

// Chalange - get by id
app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id))
      return res.status(404).send();

  Todo.findById(id).then((todos)=>{
    if (!todos)
      return res.status(404).send();
    res.send({
      todos // It's got not sending todos as an array! we send it as an object, and in the future we can work with it.
    });
  }, (e)=>{
    res.status(400).send();
  })
})

app.listen(port , ()=>{
  console.log(`Started on port ${port}`);
});

module.exports ={app};































// New todo
// var newTodo = new Todo({
//   text: "Cook dinner"
// });

// // // Another one
// var secTodo = new Todo({
//   text: "          Bobo           " ,
//   completed : true ,
//   completedAt : 22
// });
// // // Ssave to the database
// // newTodo.save().then((doc)=>{
// //   console.log('Saved Todo' , doc);
// // }, (e)=>{
// //   console.log("Can't connect");
// // })
// // secTodo.save().then((doc)=>{
// //   console.log(JSON.stringify(doc , undefined , 2));
// // }, (e)=>{
// //   console.log("Can't connect");
// // })
//
//
// // Chalange - new user model
// // email - require , trim , type: string , mitlength 1.
// // // Another one
// var firstUser = new User({
//   text: "                    "
// });
// var secUser = new User({
//   text: "        Bodo@gmail.com            "
// });
//
// secUser.save().then((doc)=>{
//   console.log(JSON.stringify(doc , undefined , 2));
// }, (e)=>{
//   console.log("Can't connect");
// })
