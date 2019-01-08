const express = require('express');
const router = express.Router();

router.get('/cards',(req, res)=>{
    let data = req.app.get('appData');
    let pagePhotos = [];
    let pageCards = data.cards;

    pageCards.forEach(ele => {
        pagePhotos = pagePhotos.concat(ele.artWork);
    });
    
    res.render('cards',{
        pageTitle:'Clash Royale Community',
        artWork:pagePhotos,
        cards: pageCards,
        pageiD:'cardsList'
    });
});


// ==== Each Cards Can check with number and name ====
router.get('/cards/:cardsID',(req, res)=>{
    let data = req.app.get('appData');
    let pagePhotos =[], pageCards = [], cardsIndex = 0;


    // filter by number
    if (parseInt(req.params.cardsID)>=0){
        cardsIndex = req.params.cardsID;
    }else{
        // filter by name
        let index = data.cards.findIndex(ele => ele.Name.toLowerCase() == req.params.cardsID.toLowerCase());
        if (index===-1){
            res.send("Please double check card's name. You can type in number also.")
        }else{
            cardsIndex = index;
        }
    }

    
        let cards=data.cards[cardsIndex];
        html += `
        <div style="margin:auto auto;">
            <img src = '/imgs/${cards.Artwork}'>
            <h3>${cards.Name.toUpperCase()}</a></h3>
            <p>Type: ${cards.Type}</p>
            <p>Elixir Cost: ${cards.ElixirCost}</p>
            <p>Rarity: ${cards.Rarity}</p>
            <p>Arena: ${cards.Arena}</p>
            <p style="width:500px">${cards.Summary}</p>
        </div>
        `
    res.send(`<ul style='list-style-type: none;'>${html}</ul>`)
});

module.exports = router;