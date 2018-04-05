const MongoClient = require('mongodb').MongoClient;
/*
a way to destructur the mongodb , and for example create ids for my user
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.console.log(obj); will print each time a new id
*/
//we are still using here local host, could be an api from Amzon ...or something
// To start a new data base using db , I just need to give it a new- meanig change the TodoApp to sothing else.
// To get a value from an object, I can use - destructrerin
var user = {name: 'Z' , age: 90 };
var {name} = user;

// now name is gleich 'Z';

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db)=>{
  if (error){
    return console.log("Unable to connect to server");
  }
  console.log('Connected to Mongodb server');

  // db.collection('Todos').insertOne({
  //   text: "Todo something",
  //   completed: false
  // }, (err,res)=>{
  //   if(err){
  //     return console.log('Unable to insert Todo', err);
  //   }
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });
  // The line under creates a new connection woth the name in the ""
  db.collection('Users').insertOne({
    name: "Niz",
    age: 26 ,
    location: "Germany"
  }, (err,res)=>{
    if(err){
      return console.log('Unable to insert Users', err);
    }

    console.log(JSON.stringify(res.ops, undefined, 2));
    console.log(res.ops[0]._id.getTimestamp()); // Pirints the time the id was created
  });
  db.close(); // Closees conenction to server
});


// in mongodb v3 verision - changes are -
// instead of db in MongoCliet line. we write client.
// than we add a a reference to TodoApp -
// const db = client.db('TodoApp');
//
// and last. we close the program with - client.close();
