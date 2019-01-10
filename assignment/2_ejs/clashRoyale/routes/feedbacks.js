const express = require('express');
const router = express.Router();

router.get('/feedbacks',(req, res)=>{

    res.render('feedbacks',{
        pageTitle:'Clash Royale Community',
        pageID:'home',
        bodyClass:'feedback'
    });
});
module.exports = router;