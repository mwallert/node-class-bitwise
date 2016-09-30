'use strict';
/* server */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

/* models */
mongoose.connect('mongodb://mwallert:galmeraz@ds035806.mlab.com:35806/mikesdb');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectID;

var Hobby = new Schema({
    name            : { type: String, required: true, trim: true }
});

var Item = new Schema({
    name            : {type: String, required: true, trim: true }
});

var Person = new Schema({
    first_name      : { type: String, required: true, trim: true },
    last_name       : { type: String, required: true, trim: true },
    username        : { type: String, required: true, trim: true },
    password        : { type: String, required: true, trim: true },
    inventory       : [Item]
});


var Person = mongoose.model('Person', Person);

router.get('/createUser', function(req, res, next){
  res.render('signup');
});

router.get('/findUser', function(req, res, next){
    Person.find({}, function(error, data){
        if(error){
          res.send('No users.');
        }
        res.json(data);
    });
});

router.post('/', function(req, res, next){

    Person.find({}, function(error, data){
        if(error){
          res.sendStatus(404)
        }
        else if(data){
          for(var i = 0; i < data.length; i++){
            if(data[i].first_name === req.body.first && data[i].password === req.body.password){
              //user found!
              console.log(`User ${req.body.first} is now logged in.`);
              res.render('loggedIn', {
                user: req.body.first,
                username: data[i].username
              });
            }
          }
        }
    });
});
router.post('/createUser', function(req, res, next){
    var person_data = {
        first_name: req.body.first,
        last_name: req.body.last,
        username: req.body.username,
        password: req.body.password
    };

    var person = new Person(person_data);

    person.save( function(error, data){
        if(error){
            res.json(error);
        }
        else{
            console.log('User Created!');
            res.render('login', {
              name: data.first_name
            });
        }
    });
});

router.post('/addInventory', function(req, res, next){
    Person.findOne({ username: req.body.username }, function(error, person){
        if(error){
            res.json(error);
        }
        else if(person == null){
            res.json('no such user!')
        }
        else{
            person.inventory.push( {name: req.body.item} );
            person.save( function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    console.log(`Item ${req.body.item} saved successfully!`);
                    res.send(`Item ${req.body.item} added successfully! Click the button below to go back to your profile page.`);
                }
            });
        }
    });
});

router.post('/inventory', function(req, res, next){
  var name = req.body.username;
  if(!name){
    res.send('No user found.');
  }

  Person.find({"username":name}, function(err, data){
    if(err){
      res.send('Users inventory not found.');
    }

    for(var i = 0; i < data.length; i++){
      if(data[i].username === name){
        //user found!
        console.log(`User ${req.body.username} has requested their inventory.`);
        res.render('inventory', {
          user: data[i]
        });
      }
    }
  });
});

module.exports = router;
