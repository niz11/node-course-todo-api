var mongoose = require('mongoose');
const validator = require('validator');
const   jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
// Here staring usuing Schema - before the object User was defined inside the moongose.models
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require:true, // validators - must hava a text filed and must be longer than ''
    minlength: 1,
    trim: true, // Take spaces away
    unique: true, // Making sure there is only one user per email address in the database
    validate: {
      validator:validator.isEmail,// Is't a function-method from the validator laibary- return true if ok or flase if not
      message:'{value} is not a valid email'
    }
  },
  password:{
    type:String,
    require: true,
    minlength:6
  },
  tokens:[{ // Array of objects, the object describe the properties available on a token
    access:{
      type: String,
      require: true
    },
    token :{
      type: String,
      require: true
    }
  }]
});
// Overriding a function now - so when we send back a json (user) file - only the email and id number will be sent callback
UserSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id', 'email']); //picking the values we want to return from the array
}

// module methods -need to call UserSchema.statics - Called on the User object -- User.findByToken - castume modul we will create
// instens methods - called on individual user - like - var user = new User(); --> called on user.generateAuthToken -- ading token to inde user
//Creating a method -
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access,token}]);  //local changed
  return user.save().then(()=>{ //saving in database , and adding to it an error function - user.save return a promise
    return token; // returning a value - instead of a promise - the token will be sent as a succsess argument to the next then call
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;
  // Using here a mongodb method - $pull , that's lets you pull exactly what you want from the database

  return user.update({ // return to chain promises
    $pull: { // Will remove all the tokens from the tokes array, that matches the token
      tokens:{
        token:token
      }
    }
  });
};

//Module method building here - finding user by token

UserSchema.statics.findByToken = function (token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET); // Putting it in try catch block because if the values doesn't match the jwt.verify throughs an error
  } catch(e){
    // return new Promise((res,rej) =>  {
    //    reject()
    //}) =
    return Promise.reject();
  }
  //Adding a return so we can chain functoins, and add a then function to the call of FindByToken call in server.js
  //Down below is the succsess case handel - quering the token array for the values
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password){
  var User = this;
//First look for the email , exist?  if pass fits, doesn't fit? return an error
  return User.findOne({email}).then((user) =>{
    if(!user)
      return Promise.reject();

    // bcrypt works only with callbacks , that's why we have to use here a promise (Since we only using here promises)
    return new Promise( (resolve, reject) =>{
      bcrypt.compare(password, user.password, (err , res) =>{
        if (!res)
          reject();
        else
          resolve(user);
      });
    });
  });
};
// Events that will happen before saving the data in the database - here hashing the password
UserSchema.pre('save', function (next){ // The regular function let us access the this object and next to end the call
  var user = this;

  if (user.isModified('password')){ // will return true only when the user changes the password! - important to avoid double hashing
    bcrypt.genSalt(10 , (err,salt)=>{
      bcrypt.hash(user.password,salt, (err , hash)=>{ //  we don't want to store the password, we want to store the hash in our database
        user.password = hash; // Will save the hash value! in our database
        next();
      })
    })
  } else {
    next();
  }
})

// Spec the models
var User = mongoose.model('User',UserSchema);

module.exports ={
  User
};
