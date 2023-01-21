/**I6038 Web Services
 * MusicHub API
 * Designed by John Wright
 * September 2022.
 * ID: 20210556
 * email: jwri211@mywhitecliffe.com
 * Uses backend of MERN stack to create an API that reaches into a mongo
 * database and retreives and modifies music track information.
*/

jsonwebtoken = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

//Call the local environment file that holds the mongo config URI
require('dotenv').config({path: "./config/.env"})
//Connect to the MongoDB server with mongoose.
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});

//Tells the app how to handle x-www-form-urlencoded requests.
app.use(express.urlencoded({ extended: true }));

//function to check the token for authentication.
app.use(function(req, res, next) {
  //looks for JWT in request header, specified by putting "JWT" in front of the token.
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode; //decode the JWT to a user and pass,
      next();
    });
  } else {
    req.user = undefined; //user is not authenticated.
    next();
  }
});

//Defines all the routes that the app requires.
const routes = require('./routes/routes');

// app.use(userRoutes)
app.use(routes)

app.listen(port, () => {
  console.log(`MusicHub API listening at http://localhost:${port}`);
});