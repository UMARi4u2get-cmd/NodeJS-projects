const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

// port
const port = 8000;
const tempOverview = fs.readFileSync(`${__dirname}/templates/temp-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/temp-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/temp-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // review page or home page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardsHtml = dataObj.map((element) => replaceTemplate(tempCard, element)).join('');

    // console.log(element);
    console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCTSCARDS%}', cardsHtml);

    res.end(output);
  }
  //   product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
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
