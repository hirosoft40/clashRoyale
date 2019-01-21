const express = require('express');
const router = express.Router();

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
router.get('/chat',(req, res)=>{
    res.render('chat',{
        pageID:'chat',
        bodyClass:'chat'
    });
});

module.exports = router;

