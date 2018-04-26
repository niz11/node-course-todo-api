var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  //console.log(req);
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      //res.status(401).send(); //authentication is required - The line below does the same - send an error to the catch and then...
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(); //authentication is required
  });
};

module.exports = {authenticate};
