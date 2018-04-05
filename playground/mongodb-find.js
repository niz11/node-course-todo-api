const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,db)=>{
  if (error){
    return console.log("Unable to connect to server");
  }
  console.log('Connected to Mongodb server');
  // inside find - is the query parameter / z.b {completed:false}
  // Need to create an object id t get them from the collection
  // db.collection('Todos').find({
  //   _id: new ObjectId('5ac4d2dca925e8d816d4cf3d')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) =>{
  //   console.log("Unable to fetch todos" , err);
  // }); // no parameters will retun all the todos. return a pointer(without the toArray)

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count ${count}`);
  // }, (err) =>{
  //   console.log("Unable to fetch todos" , err);
  // }); // no parameters will retun all the todos. return a pointer(without the toArray)

// chalange - finding only niz user names
db.collection('Users').find({name: 'Niz'}).toArray().then((docs)=>{
  console.log('Niz user -');
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) =>{
  console.log("Unable to fetch Users" , err);
}); // no parameters will retun all the todos. return a pointer(without the toArray)



//  db.close(); // Closees conenction to server
});


// in mongodb v3 verision - changes are -
// instead of db in MongoCliet line. we write client.
// than we add a a reference to TodoApp -
// const db = client.db('TodoApp');
//
// and last. we close the program with - client.close();
