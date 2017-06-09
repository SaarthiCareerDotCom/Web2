// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var User = function(name,email){
  this.name = name;
  this.email = email;
};
module.exports = User;
