const request = require('request');
var url = 'https://nodejs.org/en/';

request.get(url,(error, response, html)=>{
    if(error){
        console.log(error.message);
        return;
    }
    console.log(html);
})