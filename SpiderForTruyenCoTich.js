 /*===========================LIBRARY==============================*/
 const rp = require("request-promise");
 const cheerio = require("cheerio");
 const fs = require("fs");
 const { title } = require("process");
 const URL = `https://truyencotich.top/truyen-co-tich-viet-nam?page=1`;
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

        let page = $('div.col-md-10');
        let pageTitle = page.find('div.mainheading h1').text().trim();
        let pageContent = page.find('div.article-post p').text().trim();

        if( !pageContent )
        {
          return false;
        }

        let article = {
          "title" : pageTitle,
          "link" : URL,
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
        const tableLink = $('.col-md-12.story_2 a');
        console.log(i);
        console.log(`there are ${tableLink.length} !`);
        console.log("=============================");
        for( let i = 0 ; i < tableLink.length ;i++)
        {
                let postHref = $(tableLink[i])[0].attribs.href;

                if( postHref == "")
                {
                    continue;
                }
                
                let article = await scrapingDataFromArticle(postHref);
                data.push( article);
            }
	
        fs.writeFileSync('dataTruyenCoTich.json', JSON.stringify(data));
        console.log("Scraped Data Successfully");
})();