const express = require('express');
var app = express();
app.use(express.static('public')) //middleware 
app.use(require('./routes/shoe'))

// get require 2 arguments: 
// got to the page and return information
// app.get('/',(req, res)=>{   // '/' is root 
//     res.send('hello world') // send information back to front end
// });

app.get('/about*', (req, res)=>{
    res.send('about us page')
});

app.get('/shoes?/?',(req, res)=>{ // use reg expression : remove last letter or not
    res.send('i need new shoes')  // shoes/ shoes are allowed thanks to reg expression
});

app.get('/', (req, res, next)=>{
    console.log('first!');
    req.message = 'hello';
    next(); // next allows to chain on another function
}, 
(req, res, next) => {
    console.log('second');
    req.message += 'there';
    next();
// },
// (req, res) => {
//     req.send(req.msg)
});


// localhost:3500/shoe?lname=Ross&fname=Hiroko
// <----ROUTE --------><----parameters------->

app.get('/hello',(req, res)=>{
    var name = request.query.name || 'World';
    res.send('Hello '+name);
})
app.get('/index',(req, res)=>{
    var imgSrc = req.query.img;
    res.send(`<img src ="${imgSrc}">`)
})

app.listen(3500, ()=>{ // callback
    console.log(`listening on port 3500`)
});
