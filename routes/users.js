var express = require('express');
var router = express.Router();

var register_A_user = require('./register');
/* GET users listing. */
router.post('/register', function(req, res, next) {
  register_A_user(req.body);
  res.send(req.body);
});

module.exports = router;
