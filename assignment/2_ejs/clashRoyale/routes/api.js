const express = require('express');
const router = express.Router();
const fs = require('fs');
const feedbackData = require('../data/feedback.json')
const bodyParser = require('body-parser');


router.get('/api',(req, res)=>{
    // res.json sends a JSON response that is the parameter converted to a JSON string using JSON.stringfy(). 
    // The parameter can be any JSON type, incluing object, array, string, Boolean, number, or null and you can add use it to convert other value to JSON.
    // res.json(null); res.status(500).json({error:'message'})
    res.json(feedbackData);
});


router.use(bodyParser.json()); // telling system that I want to use json.

// if false: telling system to use a simple algorithm for shallow parsing
// if true: complex algorightm for parsing that can deal with nested objects
router.use(bodyParser.urlencoded({extended:false}));

router.post('/api',(req, res)=>{
    // データを変数に追加
    feedbackData.unshift(req.body);
    // console.log("(1) Without JSON.stringfy", feedbackData) // ==> SHOW DATA
    // console.log("(2) JSON STRINGFY", JSON.stringify(feedbackData)) ==> everthing is ""
    // console.log("(3) bodyparseer JSON",bodyParser.json(feedbackData)) ==> function Simply telling body parser to use json

    //ジェイソンファイルに書き出す   fs.writeFile(file, data[,options encoding 'utf8'], callback)
    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData),'utf8',err=>{
        if(err){
            console.error(err);
        }
    });
        // 新しいジェイソんファイルを書き出す
    res.json(feedbackData)
});


// delete route
router.delete('/api/delete/:id',(req, res)=>{
    feedbackData.splice(req.body.id,1);
    fs.writeFile('data/feedback.json',JSON.stringify(feedbackData),err=>{
        if(err){
            console.error(err)
        }
    });
    res.json(feedbackData);
})

// // edit
router.put('/api/edit/:id',(req, res)=>{
     let id = req.params.id;
     let fdbk = req.body.feedback;

    feedbackData[id].feedback = fdbk;
    //ジェイソンファイルに書き出す   fs.writeFile(file, data[,options encoding 'utf8'], callback)
    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData),'utf8',err=>{
        if(err){
            console.error(err);
        }
    });

    res.json(feedbackData);
})

module.exports = router;