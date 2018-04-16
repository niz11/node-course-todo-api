// // JSon web Token - Also libarys for that
//
// const {SHA256}= require('crypto-js');
//
// var mes = "aaaaaa";
//
// var hash = SHA256(mes).toString();
//
// console.log(`Mes : ${mes}`);
// console.log(`hash : ${hash}`);
//
// var data= {
//   id:4
// };
//
// var token = { // data we send back to the client - The hash value let us know that the right user changed the values . Security
//   data,
//   hash: SHA256(JSON.stringify(data) + 'SomeSecret').toString()
// }
//
// // Here an example where a hacker changes a users id, and also send the hash we made. It would have worked well for him, but the
// // // salting is alerting us that someone else changed the data iligally
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString()
//
//
// //Slating the hash - adding my own randow value- to not get the same hash twice
// // The salting hash is only in the servers side, so a hacker won't know how to re-write another users hash
// var resHAsh = SHA256(JSON.stringify(token.data)+ "SomeSecret").toString();
//
// if (resHAsh === token.hash) {
//   console.log('Hash was not changed');
// }else {
//   console.log('Data was changed - Do not trust');
// }

// Now here working with laibrarys -

const {SHA256}= require('crypto-js');
const   jwt = require('jsonwebtoken');

var data = {
  id:10
}

var token = jwt.sign(data, 'Mysecret'); // What we send to the user when they sign in - and we also store it in the database in user under tokens
console.log(token); // Sign that the data was not mnipulated
// Can take a look at jwt.io - Shows us the hash when we copy it from terminal -decoding - When secret is right - then signature is varified
var decoded = jwt.verify(token,'Mysecret'); // The secret has to musch!
console.log(decoded);

// If signature is invalid- we will get an error
