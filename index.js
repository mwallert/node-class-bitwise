const handlers = require('./handlers'),
      http = require('http'),
      path = require('path'),
      fs = require('fs'),
      url = require('url'),
      PORT = 5000,
      server = http.createServer((request, response) => {
        let uri = url.parse(request.url).pathname,
            filename = path.join(process.cwd(), uri);

        fs.exists(filename, (exists) => {
          if (!exists) {
            if(typeof handlers[request.method] === 'function'){
              if(request.method === 'POST'){
                  let data = '';

               request.on('data', chunk => {
                 data += chunk.toString();
               });

               request.on('end', () => {
                 data = JSON.parse(data);
                 request.body = data;
                 handlers[request.method](request, response);
               });
             } else {
               return handlers[request.method](request, response);
             }
           } else {
             response.end('That is a 404');
           }
         } else {
           fs.readFile(filename, (err, file) => {
             if (err) return response.end('Could not read the file');
             response.writeHead(200);
             response.write(file, "binary");
             response.end();
           });
         }
        });
      });



server.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
