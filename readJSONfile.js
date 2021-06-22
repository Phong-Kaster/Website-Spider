'use strict';
 /*===========================LIBRARY==============================*/
const fs = require('fs');
let rawData = fs.readFileSync('data.json');
let jsonDataArray = JSON.parse(rawData);
/*============================FUNCTION============================*/
console.log(jsonDataArray);
for(let i = 0 ; i < 2;i++)
{
    console.log("\n\n"+i + "." + jsonDataArray[i].title + "\n");
    console.log(jsonDataArray[i].content + "\n");
    console.log(jsonDataArray[i].link);
    console.log("\n==============================");
}