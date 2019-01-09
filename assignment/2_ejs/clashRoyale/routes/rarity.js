const express = require('express');
const router = express.Router();

router.get('/rarity', (req, res)=>{
    res.redirect('/cards');
});

// Rarity Cards
router.get('/rarity/:rarityID/',(req, res)=>{
    let data = req.app.get('appData');
    let pageCards=data.cards;
    let rarityID = req.params.rarityID;

    let newData = pageCards.filter(ele => ele.Rarity===rarityID)
    if (newData){
        res.render('types',{
            pageTitle:'Clash Royale Community',
            cards: newData,
            bodyClass:"rarity",
            pageID: rarityID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;