const express = require('express');
const router = express.Router();
const fs = require('fs');
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

})

// // edit route
router.put('/api/edit/:id',(req, res)=>{
    let paramId = parseInt(req.params.id);
    let fdbk = req.body.feedback;
// way 2
    db.feedbacks.update(
        {feedback: fdbk}
        ,{where:{id: {[Sequelize.Op.eq]: paramId}}
    })
    .then(results => {
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
})

module.exports = router;