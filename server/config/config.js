// Editing file in order to be more secure! Making sure config files won't be on git
// inside config.json we hide secrets variables , like the secret salt to hash the password uzw.
var env = process.env.NODE_ENV || 'development'; // have to config this inviormnet variable in package.json , curruntrly it only seted in Heroku
console.log("evv *********", env);

if ( env === 'development' || env === 'test') {
  // Geting the info from the json file. requiring the json witl auto prase the json to javascript object
  var config = require('./config.json'); // requiring a local file
  //console.log(config); object with the test and development values
  var envConfig = config[env]; // If env = test , will give us the test values , if evn = development then the development values
  // process.env.PORT = envConfig.PORT;
  // process.env.MONGODB_URI = envConfig.MONGODB_URI;
  //Object.keys = brings back an array of the keys
  Object.keys(envConfig).forEach((key) =>{
    process.env[key] /* Will set the righy key of process*/ = envConfig[key]; // Will get the value from envConfig
  })
}

// if (env === 'development' ){ // Means we're working localy - and there for using a specific database
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'; // My LocalDatabse
// } else if (env === 'test'){ // Meanes we're working with mocha - and we need the testing database
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; // My database for testing
// }
