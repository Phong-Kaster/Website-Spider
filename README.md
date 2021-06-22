# Website-Spider
A function helps us to collect data from a specific website

First of all, I'm thankful for Nguyen Dang Hau (@ngdanghau) - he is my best friend , my great teacher.And he helped me to do and learn many fabulous things 
about this topic.

You can reference his works from here : https://github.com/ngdanghau.

Once again, I'm so estasy because he taught me to complete this function and more.


Now , make it short , this website spider was written to collect data from "tinhte.vn" - one of the big technology website in Vietnam.
You can crawl any website if you can.However,you need some knowledge about jQuery to custom code for this purpose.

All collected record will be store in "data" array and stored into "data.json" file.

With regex and conditions ,we can get posts without 
 * (1)the phase "home_latest_thread_subbrand_logo" exists in the URL 
 * (2)All phase "tâm sự","QC","qc","Infographic" exist  in the Title
 * (3)Title is empty
 * (4)Description is empty
 * (5)The post has NO cover photo
 
Result we get include
 * (1) Title
 * (2) Seo
 * (3) Cover Photo's path
 * (4) Content
 * (5) Category but ObjectID value - you can custom for your purpose
 * (6) Gallery - all relative photos
 * (7) Date - Default: Date.Now
 * (8) Description
 
To use,remember command "npm install" for all dependencies I used.

To run,open your terminal and run this command "node crawler.js" and your result will appear immediately

In addition, I used "node-cron" to schedue this task.You can read for more here : https://www.npmjs.com/package/node-cron .

I don't know you and you don't know me. Probably we are not even living in the same country. We look different. We speak different languages. Maybe we are from entirely different generations. We are just complete strangers. 

But there is something that connects us. We both have great taste in getting programming 

Thank you for being here. God bless you, whoever you are
