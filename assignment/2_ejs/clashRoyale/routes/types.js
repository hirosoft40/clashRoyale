const express = require('express');
const router = express.Router();

// var data = require('../data/clashRoyaleData.json');

router.get('/types', (req, res)=>{
    res.redirect('/cards');
});

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
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;