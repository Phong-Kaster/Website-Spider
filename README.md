<h1 align="center">Website Spider</h1>

<p align="center">
    <img src="https://wordtracker-swoop-uploads.s3.amazonaws.com/uploads/ckeditor/pictures/2692/content_web_spider.png">
</p>

<h2 align="center">Scraping data for every single website</h2>

# [**Table Of Content**](#table-of-content)
- [**Table Of Content**](#table-of-content)
- [**The reason why I write**](#the-reason-why-i-write)
- [**Architecture**](#architecture)
- [**How To Run**](#how-to-run)
- [**Supported Websites**](#supported-websites)
- [**Example**](#example)
- [**Special Thank**](#special-thank)
- [**Post Script**](#post-script)

#  [**The reason why I write**](#the-reason-why-i-write)

I am a newbie to develope website & I am aware of getting access DOM object is so important. This project is useful for other newbie developer live me, not for senior website developer. I write it because my jQuery skill still lack experience so that this is my practise with jQuery & HTML tags.

# [**Architecture**](#architecture)

It is built with [***NodeJS***](#https://nodejs.org/en/), no more no less.

Each spider - javascript file is written for scraping a specific website - can access DOM object to collect data that I except, they include:

1.Title

2.Description

3.URL

4.Photos

5.Category

- Note: Maybe some javascript files doesn't scrape enough fields as to be listed above.Due to my goal when I work.You can customize if you want more.

# [**How To Run**](#how-to-run)

First of all, hit and run this command for all dependencies I used.

    npm install

To run, open your terminal and run this command and your result will appear immediately

    node + name of file

To illustrate:

    node SpiderForKenh14.js

In addition, some spiders I used [Node Cron](https://www.npmjs.com/package/node-cron) to schedule this task.

# [**Supported Websites**](#supported-websites)

- Note: I am from Vietnam so that there are many of them from my country. I will do more in the future.😎😎
  
   [Kenh14.vn](https://kenh14.vn/)

   [Tinhte](https://tinhte.vn/)

   [SachHay24h.com](https://sachhay24h.com/)
   
   [TruyenCoTich](https://truyencotich.top/)

# [**Example**](#example)

Now , make it short , there is a website spider which was written to collect data from "tinhte.vn" - one of the big technology website in Vietnam.
You can crawl any website if you can.However,you need some knowledge about jQuery to custom code for this purpose.

All collected record will be store in "data" array and stored into `dataTinhte.json` file.

With regex and conditions ,we can get posts without 
 * (1)the phase "home_latest_thread_subbrand_logo" exists in the URL 
 * (2)All phase "tâm sự","QC","qc","Infographic" exist  in the Title
 * (3)Title is empty
 * (4)Description is empty
 * (5)The post has NO cover photo
 
Result we get include:
 * (1) Title
 * (2) Seo
 * (3) Cover Photo's path
 * (4) Content
 * (5) Category but ObjectID value - you can custom for your purpose
 * (6) Gallery - all relative photos
 * (7) Date - Default: Date.Now
 * (8) Description

# [**Special Thank**](#special-thank) 

<table>
    <tr>
        <td align="center">
        <a href="https://github.com/ngdanghau">
            <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/120393662_2903859999844190_4330464510100415056_n.jpg?_nc_cat=111&ccb=1-4&_nc_sid=09cbfe&_nc_ohc=Ul9dkWA0uHsAX_b-LRf&_nc_ht=scontent.fsgn2-6.fna&oh=1e2dc9e54bf6464ebd8a2aed3896df48&oe=613209EA" width="100px;" alt=""/>
            <br />
            <sub><b> Nguyen Dang Hau </b></sub>
        </a>
        <br />
    </td>
</table>
I'm thankful for Nguyen Dang Hau - he is my best friend & my great teacher.He have been helping me to do and learn many fabulous things about this topic.

Once again, I'm so ecstasy because he taught me to complete this function and more.

# [**Post Script**](#post-script)
I don't know you and you don't know me. Probably we are not even living in the same country. We look different. We speak different languages. Maybe we are from entirely different generations. We are just complete strangers. 

But there is something that connects us. We both have great taste in getting programming 

Thank you for being here. God bless you, whoever you are
