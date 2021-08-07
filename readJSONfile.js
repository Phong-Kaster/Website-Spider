'use strict';
 /*===========================LIBRARY==============================*/
const fs = require('fs');
let rawData = fs.readFileSync('dataTruyenCoTich.json');
let jsonDataArray = JSON.parse(rawData);
/*============================FUNCTION============================*/
for(let i = 0 ; i < jsonDataArray.length;i++)
{
    console.log("\n\n"+i + "." + jsonDataArray[i].title + "\n");
    console.log(jsonDataArray[i].link);
    console.log("==============");

    /* Write Files */
    /* fs.writeFile(`nonspam/${jsonDataArray[i].title}.txt`, String(jsonDataArray[i].content), (error) => {
        if (error) throw err;
    }) */
}
 