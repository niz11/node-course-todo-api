const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db)=>{
  if (error){
    return console.log("Unable to connect to server");
  }
  console.log('Connected to Mongodb server');
//findOneAndUpdate
// Takes 4 arguments - can read online about them.
// set - will set the value - here to true
// // returnOriginal - will bring back the file before the change, but here we don't need it
//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectId('5ac66c46b63333243e061033')
//   }, {
//     $set: {
//        completed: true
//     }
//   }, {
//     returnOriginal: false
// }).then((res)=>{
//   console.log(res);
// })

//chalange - change user name and increment his age by one
// inc - "Property from file" : "How much I want to expand it - here by 1" 
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('5ac5d4efa925e8d816d4fdf6')
  }, {
    $set: {
       name: "Nadav"
    },
    $inc: {
        age: 1
      }
  }, {
    returnOriginal: false
}).then((res)=>{
  console.log(res);
})
 //db.close(); // Closees conenction to server
});
