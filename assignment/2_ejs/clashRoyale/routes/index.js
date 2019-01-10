const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    // let data = req.app.get('appData');

    res.render('index',{
        pageID:'home'
    });
});

module.exports = router;

