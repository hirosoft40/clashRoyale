const express = require('express');
const router = express.Router();

router.get('/cards',(req, res)=>{
    let data = req.app.get('appData');
    let pageCards = data.cards;
    let uniqueArena =[], uniqueRarity =[], uniqueType=[];

    uniqueType = [...new Set(data.cards.map(item => item.Type))];
    uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];
    
    res.render('cards',{
        pageTitle:'Clash Royale Community',
        cards: pageCards,
        Type: uniqueType,
        param:false,
        Rarity: uniqueRarity,
        Arena: uniqueArena,
        pageID:'All Cards'.toUpperCase()
    });
});


// ==== Each Cards Can check with number and name ====
router.get('/cards/:cardsID',(req, res)=>{
    let data = req.app.get('appData');
    let uniqueArena =[], uniqueRarity =[], uniqueType=[], cardsIndex=0;
    let pageCards=data.cards;

    uniqueType = [...new Set(data.cards.map(item => item.Type))];
    uniqueRarity = [...new Set(data.cards.map(item => item.Rarity))];
    uniqueArena = [...new Set(data.cards.map(item => item.Arena.trim()))];
    // filter by number
    if (parseInt(req.params.cardsID)>=0){
        cardsIndex = req.params.cardsID;
    }else{
        // filter by name
        let index = data.cards.findIndex(ele => ele.Name.toLowerCase() === req.params.cardsID.toLowerCase());
        if (index===-1){
            res.send("Please double check card's name. You can type in number also.")
        }else{
            cardsIndex = index;
        }
    }
    
    res.render('cards',{
        pageTitle:'Clash Royale Community',
        cards: pageCards[cardsIndex],
        param:req.params.cardsID,
        Type: uniqueType,
        Rarity: uniqueRarity,
        Arena: uniqueArena,
        pageID:pageCards[cardsIndex].Name.toUpperCase()
    });
});

module.exports = router;