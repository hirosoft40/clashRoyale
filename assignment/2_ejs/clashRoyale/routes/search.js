const express = require('express');
const router = express.Router();

router.get('/search',(req, res)=>{
    let data = req.app.get('appData');
    let searchID = req.query.search;
    let newData = data.cards.filter(item => {
        let letters = item.Name.toLowerCase();
        return letters.includes(searchID.toLowerCase())});

    if (newData){
        res.render('cards',{
            cards: newData,
            param:false,
            bodyClass:"rarity",
            pageID: "search results".toUpperCase()
        });
    } else{
        res.redirect('/cards');        // if error, go back to all cards
    }  
});

module.exports = router;