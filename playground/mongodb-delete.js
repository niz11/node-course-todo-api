const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db)=>{
  if (error){
    return console.log("Unable to connect to server");
  }
  console.log('Connected to Mongodb server');
//deleteMany
// db.collection('Todos').deleteMany({text: 'Eat launch'}).then((res)=>{
//   console.log(res);
//   // In terminal
//   // ok = 1  , Great
//   // n = number , number of deleted doctuments
// });

//deleteOne - works eactly like deleteMany, oly that it deleted only the first maching document
// db.collection('Todos').deleteOne({text: 'Eat launch'}).then((res)=>{
//   console.log(res);
// });
// ok = 1  , Great
//   // n = 1 , first much i deleted and then stops

//findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
//   console.log(res);
//   // is res - we have under value - the deleted docoument
// });

// chalange - delete all niz, and delete by id.
db.collection('Users').deleteMany({name: 'Niz'}).then((res)=>{
    console.log(res);
//   // In terminal
//   // ok = 1  , Great
//   // n = number , number of deleted doctuments
});

db.collection('Users').findOneAndDelete({
  _id: new ObjectId("5ac285df2c07f70ea070f9c3")
}).then((res)=>{
    console.log(res);
//   // In terminal
//   // ok = 1  , Great
//   // n = number , number of deleted doctuments
});



 //db.close(); // Closees conenction to server
});
