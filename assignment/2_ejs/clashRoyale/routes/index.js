const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    var data = req.app.get('appData');
    var pagePhotos = [];
    var pageCards = data.cards;

    pageCards.forEach(ele => {
        pagePhotos = pagePhotos.concat(ele.artWork);
    });
    
    res.render('index',{
        pageTitle:'Clash Royale Community',
        artWork:pagePhotos,
        cards: pageCards,
        pageiD:'home'
    });
    //res.send(html)
});

module.exports = router;

