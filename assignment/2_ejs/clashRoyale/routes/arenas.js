const express = require('express');
const router = express.Router();

// var data = require('../data/clashRoyaleData.json');

router.get('/arenas', (req, res)=>{
    res.redirect('/cards');
});

//Arena Cards
router.get('/arenas/:arenaID/',(req, res)=>{
    let data = req.app.get('appData');
    let arenaID = req.params.arenaID;

    let newData = data.cards.filter(ele => ele.Arena.split(" ").join("")===arenaID);

    if (newData){
        res.render('types',{
            cards: newData,
            bodyClass:"arena",
            pageID: arenaID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;