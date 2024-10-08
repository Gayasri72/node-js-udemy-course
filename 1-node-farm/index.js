// reading data and writing data using fs module
const fs= require('fs');


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