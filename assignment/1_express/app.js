const express = require('express');
var app = express();
app.use(express.static('public'));

// #1  print hello world
app.get('/', (req, res)=>{
    res.send('Hello World!')
});
// "Meow" at the URL /cats
// "Woof" at the URL /dogs
// "Living together" at the URL /cats_and_dogs
app.get('/cats', (req, res)=>{
    res.send("Meow");
});
app.get('/dogs', (req, res)=>{
    res.send("Woof");
});
app.get('/cats_and_dogs',(req, res)=>{
    res.send("Living together")
});

// Route Parameters
// Adding to the same program, say a greeting to the user, given that the user's name is encoded inside the URL
app.get('/greet/:name', (req, res)=>{
    res.send(`Hello, ${req.params.name}`);
});

//Query Parameters: Tell the year you were born
app.get('/greet/:name/year', (req, res)=>{
    console.log(req.query.age)
    let birthYear = req.query.age || '20';
    let d = new Date();
    let thisYear = d.getFullYear();
    res.send(`You were born in ${thisYear - birthYear}`);
});

app.listen(3500, ()=>{
    console.log('listening on port 3500')
})