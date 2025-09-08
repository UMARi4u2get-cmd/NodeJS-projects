const fs = require('fs');
const http = require('http');

const port = 8000;

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const server = http.createServer((req, res) => {
  const pathName = req.url;
  // review page or home page
  if (pathName === '/' || pathName === '/review') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1> This is the Home page </h1>');
  }
  //   product page
  else if (pathName === '/product') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  }
  //   page not found
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('<h1> page not found </h1>');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`server is listening to port: ${port}`);
});
