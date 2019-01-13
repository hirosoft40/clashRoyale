const express = require('express');
const router = express.Router();

router.get('/chat',(req, res)=>{
    res.render('chat',{
        pageTitle:'Clash Royale Community',
        pageID:'chat',
        bodyClass:'chat'
    });
});

module.exports = router;