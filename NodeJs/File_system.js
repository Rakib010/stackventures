// Synchronous way to read and write files
const fs = require("fs");

const text = "Learning file system";

// write 
fs.writeFileSync("./file.text", text);

// read 
const data = fs.readFileSync("./file.text", { encoding: "utf-8" });

console.log(data);

// Asynchronous way to read and write files

//const fs = require("fs");
fs.readFile("./file.text", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("something wrong", err);
    return;
  }
  console.log(data);
});

// write files
//const fs = require('fs');

const data1 = 'Hello, world!';

fs.writeFile('./file.text', data1, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully!');
});



