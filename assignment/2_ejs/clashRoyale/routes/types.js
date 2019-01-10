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
        res.render('types',{
            cards: newData,
            bodyClass:"types",
            pageID: typeID.toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;