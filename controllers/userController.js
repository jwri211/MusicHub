//Controller file for all mongo calls. 
const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Method to register a user.
exports.register = function(req, res) {
  var newUser = new User(req.body); //use the request body to create a new user.
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10); //use bcrypt to encrypt the password.
  newUser.save(function(err, user) { //POST saves the user to the database.
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

//Method to login with credentials.
exports.sign_in = function(req, res) {
    User.findOne({ //GET request finds an existing user.
      email: req.body.email //get the email from the body of the request.
    }, function(err, user) {
      if (err) throw err; //throw an error if the user is not found.
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' }); //only triggers if password is wrong.
      }
      //returns jwt token.
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
  };

//Method to require login.
exports.loginRequired = function(req, res, next) {
if (req.user) {
    next(); //allows the route to continue if a user is already logged in.
} else {
    return res.status(401).json({ message: 'Log in required.' });
}
};
