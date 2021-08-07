 /*===========================LIBRARY==============================*/
 const rp = require("request-promise");
 const cheerio = require("cheerio");
 const fs = require("fs");
 const { title } = require("process");
 const URL = `https://sachhay24h.com/truyen-co-tich/page/8.html`;
 const options = {
   uri: URL,
   transform: function (body) {
     return cheerio.load(body);
   },
 };
 const cron = require('node-cron');
 const { table } = require("console");
/*===========================FUNCTION==============================*/
async function scrapingDataFromArticle( postHref )
{
  let photos = [];
  const URL = postHref;
        
    const options = {
    uri: URL,
    transform: function (body) {
        return cheerio.load(body);
    },
    };

    try 
    {
        var $ = await rp(options);
    } 
    catch (error) 
    {
        return error;
    }

    let page = $('div.main-content');
    let pageTitle = page.find('h1.title-news').text().trim();
    let pageDescription = page.find('div.box-content p:first-child').text().trim();
    let pageContent = page.find('div.box-content:not(:first-child)').text().trim();


    let article = {
        "title" : pageTitle,
        "link" : URL,
        "description" : pageDescription,
        "content" : pageContent,
    }

    return article;
}

/*===========================ASYN FUNCTION==============================*/
let data = [];
(async function spiderForKenh14() 
{
  try 
  {
    var $ = await rp(options);
  } 
  catch (error) 
  {
    return error;
  }
  // lay toan bo noi dung cua chinh
  const tableLink = $('div.news-item');
  console.log(`there are ${tableLink.length} !`);
  
  for( let i = 0 ; i < tableLink.length ;i++)
  {
        let postTable = $(tableLink[i]);
        let postTitle = postTable.find('h4 a:first-child').text().trim();
        let postHref = postTable.find('h4 a:first-child')[0].attribs.href;
        let postDescription = postTable.find('p.sapo').text().trim();

        if( postTitle == '' || postDescription == '')
            continue;

        let article = await scrapingDataFromArticle(postHref);
        data.push( article);
    }
    
    fs.writeFileSync('dataSachHay24h.json', JSON.stringify(data));
    console.log(data);
    console.log("Scraped Data Successfully");
})();