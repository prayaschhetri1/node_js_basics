const http = require("http");
const fs = require("fs");
const port = 8000;
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./replaceTemplate');
// console.log(slugify("iPhone 9",{lower:true}));


const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

let data = fs.readFileSync(`${__dirname}/db/data.json`, "utf-8");
let dataObj = JSON.parse(data);


const slugs = dataObj.map(el => slugify(el.title,{lower:true}));
console.log("This is coming from slugify node package!",slugs)
// console.log(slugs);
// Server
const server = http.createServer((req, res) => {
  // console.log(req.url)
  console.log(url.parse(req.url,true).pathname)
  const {pathname,query} =url.parse(req.url,true);
  // console.log(query.id)
  // console.log(pathname)
  // const pathName = req.url;


  //   Overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = dataObj.map((el) => replaceTemplate(tempCard, el)).join('')
    // console.log(cardsHTML)
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHTML)
    res.end(output);

    // Product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
      const product = dataObj[query.id-1];
      // console.log(product)
      const output = replaceTemplate(tempProduct,product);
      // console.log(output)
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Error Page
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello from error page",
    });
    res.end(`<h1>Page Not Found</h1>`);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("Listning to port 8000 !");
});
