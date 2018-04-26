const {ObjectID} = require('mongodb');
const   jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'niz@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString() //process.env.JWT_SECRET is congiged in config.json , just a value i save localy amd not uploadind to git or heroku
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id : new ObjectID(), // Adding manually id's to we can test Get todo/id
  text: "First test todo",
  _creator : userOneId
}, {
  _id : new ObjectID(),
  text: "second test todo",
  completed: true,
  completedAt: 22 ,
  _creator : userTwoId
}];
// SOem tests need to have data in database, so we build here a known to us database
const populateTodos = (done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(() => done());
};

// SOem tests need to have data in database, so we build here a known to us database
const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(users[0]).save(); // Runs the middleware
    var user2 = new User(users[1]).save();

    // Promise.all([user1,user2]).then(() => { // Won't be called until user1 and user2 were saved in the database
    //
    // }) that's one way - another way to write it -

    return Promise.all([user1, user2]) //Takes an array of promses, will called nack nly when both are finished
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
