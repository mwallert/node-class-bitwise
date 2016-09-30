var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'GeekWise',
    course: 'Node.js',
    subjects: [
      'node.js', 'led-zeppelin', 'dragons', 'mongodb'
    ]
   });
});

router.get('/loggedIn', function(req, res, next) {
  res.render('loggedIn');
});

module.exports = router;
