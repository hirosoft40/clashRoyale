const express = require('express');
const router = express.Router();

var data = require('../data/clashRoyaleData.json');

// Types Cards
router.get('/types/:typeID/',(req, res)=>{
    let data = req.app.get('appData');
    let uniqueArena =[], uniqueRarity =[], uniqueType=[];
    let pageCards=data.cards;
    let typeID = req.params.typeID;

    uniqueType = [...new Set(data.cards.map(item => item.Type))];
    uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];

    let newData = pageCards.filter(ele => ele.Type===typeID)
    if (newData){
    res.render('types',{
        pageTitle:'Clash Royale Community',
        cards: newData,
        Type: uniqueType,
        bodyClass:"types",
        Rarity: uniqueRarity,
        Arena: uniqueArena,
        pageID: typeID.toUpperCase()
    });
    } else{
        res.render('/')        // check how to send to the index page when error
    }  
});

module.exports = router;