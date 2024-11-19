// reading data and writing data using fs module
// const fs= require('fs');
import fs from 'fs';
// include http module
// const http=require('http');
import http from 'http';

const hello ='Hello world!';
console.log(hello);

// reading data from file
const textIn=fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

// writing data to file

const textOut=`This what we know about the avacardo:${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);
console.log('File written!');

const myProfile="hello my name is Gyasri";
fs.writeFileSync('./txt/Profile.txt',myProfile); 
console.log('Profile written!');    


// creating server
const server=http.createServer((req,res) =>{
    res.end('Hello from the server');
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8000');
})