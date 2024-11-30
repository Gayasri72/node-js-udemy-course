// reading data and writing data using fs module

// we can use import statement without install package.json with help of .mjs file extension
const fs = require("fs");
// import fs from 'fs';
// include http module
const http = require("http");
const url = require("url");
//our module to replace the template
const replaceTemplate=require("./modules/replaceTemplate");
const slugify = require("slugify");
// import http from 'http';

// const hello = "Hello world!";
// console.log(hello);

// reading data from file
//----------------------------------------------------------------------------------------------
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
//----------------------------------------------------------------------------------------------
// writing data to file
//----------------------------------------------------------------------------------------------
// const textOut = `This what we know about the avacardo:${textIn}.\n Created on ${new Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// const myProfile = "hello my name is Gyasri";
// fs.writeFileSync("./txt/Profile.txt", myProfile);
// console.log("Profile written!");
//----------------------------------------------------------------------------------------------

// reading the output file
//----------------------------------------------------------------------------------------------
// const textOut1 = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textOut1);
//----------------------------------------------------------------------------------------------

// non blocking asynchronous way of reading and writing file
//----------------------------------------------------------------------------------------------
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final2.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });

// console.log("hello!");
//----------------------------------------------------------------------------------------------


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8", )
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8", )
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8", )



const data=fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8", )
    

const dataObj = JSON.parse(data);
 const slugs=dataObj.map(el=>slugify(el.productName,{lower:true}))

//creating server

const server = http.createServer((req, res) => {
    const {query,pathname}=url.parse(req.url,true)
 

  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
    const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
    res.end(output);

  //PRODUCT PAGE  
  } else if (pathname === "/product") {
    const product=dataObj[query.id]
    res.writeHead(200, { "Content-type": "text/html" });
    const output=replaceTemplate(tempProduct,product)
    res.end(output);


    //API PAGE
  } else if (pathname === "/api") {
    
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    

    //NOT FOUND PAGE
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>WTF! No page Buddy😒</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
