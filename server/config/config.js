var env = process.env.NODE_ENV || 'development'; // have to config this inviormnet variable in package.json , curruntrly it only seted in Heroku
console.log("evv *********", env);

if (env === 'development' ){ // Means we're working localy - and there for using a specific database
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'; // My LocalDatabse
} else if (env === 'test'){ // Meanes we're working with mocha - and we need the testing database
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; // My database for testing
}
