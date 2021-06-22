/**==============================================================================================================
 * CRAWL.JS will crawl all "tinhte.vn" record and then it'll get all Title
 * Description and URL .They will be stored to "data" array.Finally, this
 * array is stored in "data.json" file
 ================================================================================================================*/

 /*===========================LIBRARY==============================*/
const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { title } = require("process");
const URL = `https://tinhte.vn/`;
const options = {
  uri: URL,
  transform: function (body) {
    return cheerio.load(body);
  },
};
const cron = require('node-cron');
let category = [
  "604f5e6aa417468c0da8b31b",// âm nhạc
  "604f5e7ca417468c0da8b31c",// thể thao
  "604f5eada417468c0da8b31e",// game
  "604f5ee70608e4b9dd149cca",// lập trình
  "604f5ef60608e4b9dd149ccb",// ô tô - xe máy
  "604f5f020608e4b9dd149ccc",// thiết bị âm thanh
  "60a26cb2f58613f60d08e0a1" // đời sống
];
/*============================REGEX============================*/
let regexUselessURL = /https.+home_latest_thread_subbrand_logo/;
let regexTitleFilter = /(Tâm sự)|(QC)|(qc)|(Infographic)|(Tổng hợp game).+/;

let regexMusic = /(.|)+(Âm nhạc)|(âm nhạc)|(Ca sĩ)|(ca sĩ)|(nhạc)|(Nhạc)|(Album)|(Spotify)+(.|)/;
let regexSport = /(.|)+(thể thao)|(huy chương)+(.|)/;
let regexGame = /(.|)+(game)|(Game)|(Console)|(console)|(trò chơi)|(playstation)+(.|)/;
let regexProgramming = /(.|)+(lập trình)|(Lập trình)|(dev)|(deverloper)|(coder)|(Coder)+(.|)/
let regexCar = /(.|)+(Ô tô)|(Tốc độ)|(tốc độ)|(ô tô)|(xế hộp)|(xe hơi)|(xe)|(Ford)|(Hyundai)+(.|)/;
let regexAudio = /(.|)+(Loa)|(loa)|(tai nghe)|(Tai nghe)|(iTune)|(Apple Music)|(Âm thanh)|(âm thanh)|(nhạc)|(true wireless)|(máy trợ thính)|(ear)+(.|)/
/*============================FUNCTION============================*/

/**Classify helps us to know what exactly category for each post we get and return ObjectID value*/
function classify(messenge)
{
  let result;// "60a26cb2f58613f60d08e0a1")
       if( regexMusic.test(messenge))
      result =  category[0];
  else if( regexSport.test(messenge))
      result =  category[1];
  else if( regexGame.test(messenge))
      result =  category[2];
  else if( regexProgramming.test(messenge))
      result =  category[3];
  else if( regexCar.test(messenge))
      result =  category[4];
  else if ( regexAudio.test(messenge))
      result =  category[5];
  else
      result =  category[6];
  return result;
}
/*Convert a string to seo url*/
function toSeoUrl(url) {
  return url.toString()               // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
      .replace(/\s+/g,'-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g,'-and-')          // Replace ampersand
      .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g,'-')             // Remove duplicate dashes
      .replace(/^-*/,'')              // Remove starting dashes
      .replace(/-*$/,'');             // Remove trailing dashes
}
/* =================== scraping Data From Article =================== */
async function scrapingDataFromArticle( postHref )
{
  let URL = postHref;
  const options = 
  {
    uri: URL,
    transform: function (body)
    {
      return cheerio.load(body);
    }
  };
 
  
  try 
  {
      var $ = await rp(options);
  } 
  catch (error) 
  {
      return error;
  }

    let postTitle = $(".jsx-2508229361.thread-title").text().trim();
    
    if(regexTitleFilter.test(postTitle) == false)
    {
        let postSeo = toSeoUrl(postTitle);
        let postContent =  $(".jsx-1689703282.xfBody.big").text().replace(/(\n\n|\t)/g,'');
        let postPhotos = $(".bdImage_attachImage").find("img");
        let postCategory = classify(postTitle);
        let postGallery = [];

        for(let j = 0 ;j < postPhotos.length;j++)
        {
          postGallery.push(postPhotos[j].attribs.src);
        }
        let article = {
          "title" : postTitle,
          "seo" : postSeo,
          "content" : postContent,
          "photos" : postGallery,
          "category" : postCategory
        }
        return article;
    }

    
}
/**===========================CRAWLER===========================
 * This async function CRAWLER will ignore all posts have features below:
 * 
 * (1)the phase "home_latest_thread_subbrand_logo" exists in the URL 
 * (2)All phase "tâm sự","QC","qc","Infographic" exist  in the Title
 * (3)Title is empty
 * (4)Description is empty
 * (5)The post has NO cover photo
 */
(async function crawler() 
{
  try 
  {
    var $ = await rp(options);
  } 
  catch (error) 
  {
    return error;
  }
 
 
  
  /**=================================================================
   * tableLink gets all <a> tag in the first line of class "article"
   =================================================================*/
  const tableLink = $("article.jsx-962700794 a:first-child");
  console.log("THERE ARE "+tableLink.length+" LINKS");



  /**=================================================================
   *                tableContent gets all <li> tag
   =================================================================*/
   const tableContent = $(".jsx-1666688243 li");


   
  /**=================================================================
   * "data" array store all records which contains chaperTitle, 
   * chaperDescription and chaperLink in "data.json" file
   =================================================================*/
  let data = [];

  for (let i = 0; i < tableLink.length; i++)
  {
      let chaperLink = tableLink[i].attribs.href;
      if( regexUselessURL.test(chaperLink) == true)
          continue;


      let chaper = $(tableContent[i]);
      let chaperTitle = chaper.find("div.jsx-962700794 h3").text().trim();
      let chaperDescription = chaper.find("div.jsx-962700794 p").text();
      
      

      if( regexUselessURL.test(chaperLink) == false &&
          chaperTitle !== "" && 
          chaperDescription !== "")
      {
        let article = await scrapingDataFromArticle(chaperLink);
        data.push( article );
      }
  }
  console.log("Hello Tinhte");
  console.log(data);
  console.log("NOTICE : Done successfully");

  // Store all records we got into a "data.json" file
  fs.writeFileSync('data.json', JSON.stringify(data))
  })();
