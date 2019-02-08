const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../config/auth');

// index 
router.get('/',(req, res)=>{
    res.render('index',{
        bodyClass:"index",
        pageID:'home'
    });
});

// feedback
router.get('/feedback',(req, res)=>{
    res.render('feedback',{
        pageTitle:'Clash Royale Community',
        pageID:'feedback',
        bodyClass:'feedback'
    });
});

// chat
router.get('/chat',ensureAuth,(req, res)=>{
    res.render('chat',{
        username: req.user["username"],
        pageID:'chat',
        bodyClass:'chat'
    });
});


module.exports = router;

