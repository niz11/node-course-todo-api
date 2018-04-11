var mongoose = require('mongoose');
// Confuguring the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports ={
  mongoose
};
