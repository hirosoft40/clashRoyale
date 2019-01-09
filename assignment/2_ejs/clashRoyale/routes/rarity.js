const express = require('express');
const router = express.Router();

var data = require('../data/clashRoyaleData.json');

// Rarity Cards
router.get('/rarity/:rarityID/',(req, res)=>{
    let data = req.app.get('appData');
    let uniqueArena =[], uniqueRarity =[], uniqueType=[];
    let pageCards=data.cards;
    let rarityID = req.params.rarityID;

    uniqueType = [...new Set(data.cards.map(item => item.Type))];
    uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];

    let newData = pageCards.filter(ele => ele.Rarity===rarityID)
    if (newData){
    res.render('types',{
        pageTitle:'Clash Royale Community',
        cards: newData,
        bodyClass:"rarity",
        Type: uniqueType,
        Rarity: uniqueRarity,
        Arena: uniqueArena,
        pageID: rarityID.toUpperCase()
    });
    } else{
        res.render('/')
    }  
});

module.exports = router;