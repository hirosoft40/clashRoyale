const express = require('express');
const router = express.Router();

router.get('/feedback',(req, res)=>{
    res.render('feedback',{
        pageTitle:'Clash Royale Community',
        pageID:'home',
        bodyClass:'feedback'
    });
});

module.exports = router;