const fs = require('fs');
const http = require('http');

const status_ok = 200;
const status_pageNotFound = 404;

// const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const port = 8000;

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/review') {
    res.writeHead(status_ok, { 'content-type': 'text/html' });
    res.end('<h1> This is the Home page </h1>');
  } else if (pathName === '/product') {
    res.writeHead(status_ok, { 'content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(status_pageNotFound, { 'content-type': 'text/html' });
    res.end('<h1> page not found </h1>');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`server is listening to port: ${port}`);
});
