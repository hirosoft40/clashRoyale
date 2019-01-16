const express = require('express');
const router = express.Router();

router.get('/types', (req, res)=>{
    res.redirect('/cards');
});

// Types Cards
router.get('/types/:typeID/',(req, res)=>{
    let data = req.app.get('appData');
    let typeID = req.params.typeID;
    let newData = data.cards.filter(ele => ele.Type===typeID)

    if (newData){
        res.render('cards',{
            cards: newData,
            bodyClass:"types",
            param:false,
            pageID: typeID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

// ====== Arena Cards
router.get('/arenas', (req, res)=>{
    res.redirect('/cards');
});

router.get('/arenas/:arenaID/',(req, res)=>{
    let data = req.app.get('appData');
    let arenaID = req.params.arenaID;
    let newData = data.cards.filter(ele => ele.Arena.split(" ").join("")===arenaID);

    if (newData){
        res.render('cards',{
            cards: newData,
            param:false,
            bodyClass:"arena",
            pageID: arenaID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

// Rarity Cards
router.get('/rarity', (req, res)=>{
    res.redirect('/cards');
});

router.get('/rarity/:rarityID/',(req, res)=>{
    let data = req.app.get('appData');
    let rarityID = req.params.rarityID;
    let newData = data.cards.filter(ele => ele.Rarity===rarityID)
    if (newData){
        res.render('cards',{
            cards: newData,
            bodyClass:"rarity",
            param:false,
            pageID: rarityID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;