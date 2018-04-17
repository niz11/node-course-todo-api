var mongoose = require('mongoose');
// Confuguring the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI); // This is an enviorment variable - If runnig in Heroku it would get the online database pointer

module.exports ={
  mongoose
};


// cd ../../Program Files/MongoDB/server/bin
//mongod.exe --dbpath /Users/nizan/mongo-data

// To have a testing data base, we can use process.env.NODE_ENV === 'test' (mocha) / 'production' (Heroku) / 'development' (localy)
