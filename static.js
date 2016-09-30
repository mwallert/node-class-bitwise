'use strict';

const http = require('http'),
  PORT = 5000,
  path = require('path'),
  fs = require('fs'),
  url = require('url'),
  server = http.createServer((request, response) => {
    let uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);

    fs.exists(filename, (exists) => {
      if (!exists) {
        return response.end();
      }

      fs.readFile(filename, (err, file) => {
        if (err) {
          return response.end('Could not read the file: ' + err.msg);
        }
        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  });

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
