const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    // let data = req.app.get('appData');

    res.render('index',{
        pageTitle:'Clash Royale Community',
        pageID:'home'
    });
});

module.exports = router;

