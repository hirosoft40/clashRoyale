const express = require('express');
const router = express.Router();

router.get('/cards',(req, res)=>{
    let data = req.app.get('appData');
    let pageCards = data.cards;
    
    res.render('cards',{
        cards: pageCards,
        param:false,
        pageID:'All Cards'.toUpperCase()
    });
});


// ==== Each Cards Can check with number and name ====
router.get('/cards/:cardsID',(req, res)=>{
    let data = req.app.get('appData');
    let pageCards=data.cards;

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
        cards: pageCards[cardsIndex],
        param:req.params.cardsID,
        pageID:pageCards[cardsIndex].Name.toUpperCase()
    });
});

module.exports = router;