const express = require('express');
const router = express.Router();

// var data = require('../data/clashRoyaleData.json');

router.get('/arenas', (req, res)=>{
    res.redirect('/cards');
});


//Arena Cards
router.get('/arenas/:arenaID/',(req, res)=>{
    let data = req.app.get('appData');
    // let uniqueArena =[], uniqueRarity =[], uniqueType=[];
    let pageCards=data.cards;
    let arenaID = req.params.arenaID;

    // uniqueType = [...new Set(data.cards.map(item => item.Type))];
    // uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    // uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];

    let newData = pageCards.filter(ele => ele.Arena.split(" ").join("")===arenaID);

    if (newData){
        res.render('types',{
            pageTitle:'Clash Royale Community',
            cards: newData,
            bodyClass:"arena",
            // Type: uniqueType,
            // Rarity: uniqueRarity,
            // Arena: uniqueArena,
            pageID: arenaID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;