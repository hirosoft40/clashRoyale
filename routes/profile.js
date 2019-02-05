const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


// if false: telling system to use a simple algorithm for shallow parsing
// if true: complex algorightm for parsing that can deal with nested objects
router.use(bodyParser.urlencoded({extended:false}));

// profile get
router.get('/profile', (req, res) => {
    res.render('profile')
})

// profile get
// router.get('/profile/:userID', (req, res) => {
//     const {username} = req.params.userID;
//     res.render('profile')
// })

router.post('/profile',(req, res)=>{
    const {username, password, email, image_url} = req.body;

    //utilizing bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            console.log(password, salt, hash)
            db.users.create({
                username
                , password_hash: hash
                , password_salt: salt
                , email
                , image_url
            })
            .then(results => {
                res.render('profile',{
                    username:results['username']
                })                  
            })
            .catch(error => {
                res.render('message',{
                    topMsg:`ERROR, ${error}.`
                })                
            })
        });
    });
});


// delete account
router.delete('/profile/:userID/delete',(req,res)=>{
    let userID = req.params.userID;
    db.users.destroy({
        where: {
            username: {[Sequelize.Op.eq]: userID}
        }
    }).then(results=>{
        res.render('index');
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:`Please try again.`,
        });
    })
})



// edit account detail
router.put('/profile/:userID/edit',(req,res)=>{
    let userID = req.params.userID;
    let pwd = req.body.password;
    //utilizing bcrypt

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwd, salt, (err, hash) => {
            let updatedObj = {};
            Object.keys(req.body).forEach(function(item) {
                if (item === 'password'){
                    updatedObj['password_hash']= hash,
                    updatedObj['password_salt']= salt
                } else{
                    updatedObj[item] = req.body[item];
                }
            });
            db.users.update(
                updatedObj
                ,{where: {
                    username: {[Sequelize.Op.eq]: userID}
                }
            })
            .then(results => {
                // console.log(results.length)
                if (results.length >0){
                    res.render('home');
                }else{
                    res.render('message',{
                        topMsg:`ERROR, No data has been updated.`,
                        secondMsg:`Please try Update again.`
                    });
                }                      
            })
            .catch(error => {
                res.render('message',{
                    topMsg:`ERROR, ${error}.`,
                    secondMsg:`Please try Update again.`
                })                
            })
        });
    });
});

module.exports = router;