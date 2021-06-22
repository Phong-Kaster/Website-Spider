 /*===========================LIBRARY==============================*/
 const rp = require("request-promise");
 const cheerio = require("cheerio");
 const fs = require("fs");
 const { title } = require("process");
 const URL = `https://kenh14.vn/`;
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

        let chapter = $('.kbwcb-left-wrapper .clearfix');
        let chapterTitle = chapter.find('h1.kbwc-title').text().trim();
        let chapterDescription = chapter.find('h2.knc-sapo').text().trim();
        let chapterContent = chapter.find('.knc-content').text().trim();
        let chapterPhoto = chapter.find('.knc-content img');

        for( let i = 0 ; i < chapterPhoto.length ;i++)
        {
          photos.push(chapterPhoto[i].attribs.src);
        }

        let article = {
          "title" : chapterTitle,
          "link" : URL,
          "description" : chapterDescription,
          "content" : chapterContent,
          "gallery" : photos
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
  const tableLink = $('.kds-new-stream-wrapper li .knswli-right');
  console.log(`there are ${tableLink.length} !`);
  
  for( let i = 0 ; i < tableLink.length ;i++)
  {
        let postTable = $(tableLink[i]);
        let postTitle = postTable.find('h3 a:first-child').text().trim();
        let postHref = "https://kenh14.vn/" + postTable.find('h3 a:first-child')[0].attribs.href;
        let postCategory = postTable.find('div.knswli-meta').text().trim();
        let postDescription = postTable.find('span.knswli-sapo.sapo-need-trim').text().trim();

        if( postTitle == '' || postDescription == '')
            continue;
            
        let article = await scrapingDataFromArticle(postHref);
        data.push( article);
        
    }
    console.log(data);
    fs.writeFileSync('data.json', JSON.stringify(data));
    
})();