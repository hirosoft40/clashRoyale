const express = require('express');
const router = express.Router();

var data = require('../data/clashRoyaleData.json');

//Arena Cards
router.get('/arenas/:arenaID/',(req, res)=>{
    let data = req.app.get('appData');
    let uniqueArena =[], uniqueRarity =[], uniqueType=[];
    let pageCards=data.cards;
    let areaID = req.params.arenaID;

    uniqueType = [...new Set(data.cards.map(item => item.Type))];
    uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];

    let newData = pageCards.filter(ele => ele.Arena.split(" ").join("")===areaID)
    if (newData){
    res.render('types',{
        pageTitle:'Clash Royale Community',
        cards: newData,
        Type: uniqueType,
        Rarity: uniqueRarity,
        Arena: uniqueArena,
        pageID: areaID.toUpperCase()
    });
    } else{
        res.render('/')
    }  
});

module.exports = router;