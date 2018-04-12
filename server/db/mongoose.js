var mongoose = require('mongoose');
// Confuguring the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports ={
  mongoose
};


//mongod.exe --dbpath /Users/nizan/mongo-data
