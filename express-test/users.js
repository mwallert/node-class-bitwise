'use strict';

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/user', (req, res) => {
    res.send('<h1>Hello User!</h1>');
  });

  app.get('/zeppelin', (req, res) => {
    res.send('zeppelin rocks!');
  });

  app.post('/newUser', (req, res) => {
    res.send('You have created a new user!');
  });


};
