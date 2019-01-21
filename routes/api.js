const express = require('express');
const router = express.Router();
const fs = require('fs');
// const feedbackData = require('../data/json/feedback.json')
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');

router.get('/api',(req, res)=>{
    // res.json sends a JSON response that is the parameter converted to a JSON string using JSON.stringfy(). 
    // The parameter can be any JSON type, incluing object, array, string, Boolean, number, or null and you can add use it to convert other value to JSON.
    // res.json(null); res.status(500).json({error:'message'})
    // res.json(feedbackData);
    db.feedbacks.findAll({
        attributes:['id','name','feedback','feeling.icon']
        ,order: [['id', 'DESC']]
        ,include: [{
            model:db.feelings,
            required:true
        }]
    }).then(results => {
            res.json(results)
    });
});


// router.use(bodyParser.json()); // telling system that I want to use json.

// if false: telling system to use a simple algorithm for shallow parsing
// if true: complex algorightm for parsing that can deal with nested objects
router.use(bodyParser.urlencoded({extended:false}));

router.post('/api',(req, res)=>{
    let icon = !(req.body.icon) ? null : parseInt(req.body.icon);

    db.feedbacks.create({name:req.body.name, feedback:req.body.feedback, icon_id:icon})
    .then(results => {
        // console.log(data.get({plain: true}))
        db.feedbacks.findAll({
            attributes:['id','name','feedback','feeling.icon']
            ,order: [['id', 'DESC']]
            ,include: [{
                model:db.feelings,
                required:true
                }]
        })
        .then(results => {
                res.json(results)
        });
    })
    .catch(error => {
        console.error(`Error Message: ${error}`)
    })
});

    // データを変数に追加
    // feedbackData.unshift(req.body);
    // console.log("(1) Without JSON.stringfy", feedbackData) // ==> SHOW DATA
    // console.log("(2) JSON STRINGFY", JSON.stringify(feedbackData)) ==> everthing is ""
    // console.log("(3) bodyparseer JSON",bodyParser.json(feedbackData)) ==> function Simply telling body parser to use json

    //ジェイソンファイルに書き出す   fs.writeFile(file, data[,options encoding 'utf8'], callback)
    // fs.writeFile('data/json/feedback.json', JSON.stringify(feedbackData),'utf8',err=>{
    //     if(err){
    //         console.error(err);
    //     }
    // });
    //     // 新しいジェイソんファイルを書き出す
    // res.json(feedbackData)



// delete route
router.delete('/api/delete/:id',(req, res)=>{
    let paramId = parseInt(req.params.id);
    db.feedbacks.destroy({
        where:{id: {[Sequelize.Op.eq]: paramId}}
        })
    .then(results => {
        // console.log(data.get({plain: true}))
        db.feedbacks.findAll({
            attributes:['id','name','feedback','feeling.icon']
            ,order: [['id', 'DESC']]
            ,include: [{
                model:db.feelings,
                required:true
                }]
        })
        .then(results => {
                res.json(results)
        });
    })
    .catch(error => {
        console.error(`Error Message: ${error}`)
    })
    // fs.writeFile('data/json/feedback.json',JSON.stringify(feedbackData),err=>{
    //     if(err){
    //         console.error(err)
    //     }
    // });
    // res.json(feedbackData);
})

// // edit
router.put('/api/edit/:id',(req, res)=>{
    let paramId = parseInt(req.params.id);
    let fdbk = req.body.feedback;
// way 2
    db.feedbacks.update(
        {feedback: fdbk}
        ,{where:{id: {[Sequelize.Op.eq]: paramId}}
    })
    .then(results => {
        // console.log(data.get({plain: true}))
        db.feedbacks.findAll({
            attributes:['id','name','feedback','feeling.icon']
            ,order: [['id', 'DESC']]
            ,include: [{
                model:db.feelings,
                required:true
                }]
        })
        .then(results => {
                res.json(results)
        });
    })
    .catch(error => {
        console.error(`Error Message: ${error}`)
    })
    // feedbackData[id].feedback = fdbk;
    // //ジェイソンファイルに書き出す   fs.writeFile(file, data[,options encoding 'utf8'], callback)
    // fs.writeFile('data/json/feedback.json', JSON.stringify(feedbackData),'utf8',err=>{
    //     if(err){
    //         console.error(err);
    //     }
    // });
    // res.json(feedbackData);
})

module.exports = router;