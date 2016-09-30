const moment = require('moment-timezone'),
      storage = require('./storage');

module.exports = {
  'GET': (request, response) => {
    if(request.url === '/hello'){
      response.end(`This is a ${request.method} request from this endpoint ${request.url}. Hello there!`);
    }
    else if(request.url === '/dateNow'){
      let now = moment().tz("America/Los_Angeles").format('dddd, MMMM Do YYYY, h:mm:ss a');

      response.end(`This is a ${request.method} request, here is your timestamp: ${now}`);
    }
    else response.end('Invalid request, this is a 404.');
  },
  'POST': (request,response) => {
    if(request.url === '/hello'){
      response.end(`This is a ${request.method} request from this endpoint ${request.url}. Hello there!`);
    }
    else if(request.url === '/dateNow'){
      let now = moment().tz("America/Los_Angeles").format('dddd, MMMM Do YYYY, h:mm:ss a');
      response.end(`Hello ${request.body.name}, the date is: ${now}`);
    }
    else if(request.url === '/store'){
      for(var key in request.body){
        if(request.body.hasOwnProperty(key)) {
          storage.set(key, request.body[key]);
        }
      }
      response.end('check the logs');
    }
    else response.end('Invalid request, this is a 404.');
  },
  'PUT': (request,response) => {
    if(request.url === '/hello'){
      response.end(`This is a ${request.method} request from this endpoint ${request.url}. PUT Hello here!`);
    }
    else if(request.url === '/dateNow'){
      let now = moment().tz("America/Los_Angeles").format('dddd, MMMM Do YYYY, h:mm:ss a');

      response.end(`This is a ${request.method} request, here is your timestamp: ${now}`);
    }
    else response.end('Invalid request, this is a 404.');
  },
  'PATCH': (request,response) => {
    if(request.url === '/hello'){
      response.end(`This is a ${request.method} request from this endpoint ${request.url}. Hello patch!`);
    }
    else if(request.url === '/dateNow'){
      let now = moment().tz("America/Los_Angeles").format('dddd, MMMM Do YYYY, h:mm:ss a');

      response.end(`This is a ${request.method} request, here is your timestamp: ${now}`);
    }
    else response.end('Invalid request, this is a 404.');
  },
  'DELETE': (request,response) => {
    if(request.url === '/hello'){
      response.end(`This is a ${request.method} request from this endpoint ${request.url}. Hello delete!`);
    }
    else if(request.url === '/dateNow'){
      response.end(`This is a ${request.method} request, here is your timestamp: ...deleted`);
    }
    else response.end('Invalid request, this is a 404.');
  }
};
