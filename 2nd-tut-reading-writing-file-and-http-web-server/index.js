const fs = require("fs");
const http = require("http");

////////////// FILES SYSTEM ///////////////////////
// Blocking , Synchronous way
// const inputText = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(inputText)
// const outputText = `This is the description of avocado : \n ${inputText} \n Created on : ${Date.now()}`;
// console.log(outputText)

// fs.writeFileSync("./txt/output.txt", outputText);
// console.log('File Written');

// Non-Blocking, Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if(err){
//       return console.log("Error1 !")
//     }
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     // console.log(data2)
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(`./txt/final.txt`, `${data2} \n ${data3}`, (err, data3) => {
//         console.log("Your file is written successfully☺️");
//       });
//     });
//   });
// });
// console.log("Will read the start.txt file or will return error message");

//////////////// FILES SYSTEM ENDS ///////////////////////

//////////////////// HTTP SERVER //////////////////////////

const port = 8000;
const server = http.createServer((req, res) => {
  // console.log(req)
  const pathName = req.url;
  if(pathName==="/"){
    res.end("This is the home page");
  }
  else if(pathName==="/product"){
     res.writeHead(200,{
      "Content-type":"text/html"
     })
     res.end("<h1>This is the product page !</h1>");
  }
  else{
    res.writeHead(400, {
      "Content-type": "text/html",
    });
     res.end("<h1>404 page not found</h1>");
  }
});

server.listen(port,'127.0.0.1',() =>{
   console.log("Listning to request on port 8000 !")
})