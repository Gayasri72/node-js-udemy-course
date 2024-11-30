// reading data and writing data using fs module

// we can use import statement without install package.json with help of .mjs file extension
const fs = require("fs");
// import fs from 'fs';
// include http module
const http = require("http");
// import http from 'http';

const hello = "Hello world!";
console.log(hello);

// reading data from file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// writing data to file

const textOut = `This what we know about the avacardo:${textIn}.\n Created on ${new Date()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");

const myProfile = "hello my name is Gyasri";
fs.writeFileSync("./txt/Profile.txt", myProfile);
console.log("Profile written!");

// reading the output file
const textOut1 = fs.readFileSync("./txt/output.txt", "utf-8");
console.log(textOut1);

// non blocking asynchronous way of reading and writing file

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final2.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written");
      });
    });
  });
});

console.log("hello!");

// creating server
// const server=http.createServer((req,res) =>{
//     res.end('Hello from the server');
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log('Listening to request on port 8000');
// })
