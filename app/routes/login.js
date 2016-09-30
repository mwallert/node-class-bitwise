'use strict';

var express = require('express'),
  router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {

  for(var i = 0; i < users.users.length; i++){
    let user = users.users[i];

    if(user.name === req.body.name && user.password === req.body.password){
      //user found!
      console.log('Success!');
      res.redirect('loggedIn');
    }

    res.sendStatus(404);
    next();
  }
});

module.exports = router;
