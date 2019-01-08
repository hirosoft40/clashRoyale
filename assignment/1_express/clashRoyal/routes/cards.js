const express = require('express');
const router = express.Router();

var data = require('../data/clashRoyaleData.json');

router.get('/cards',(req, res)=>{
    let html = '';
    var count = 0;
    data.cards.forEach(ele => {
            // make clickable with name and #
        html += `
        <div style="margin:10px;">
            <img src = '/imgs/${ele.Artwork}'>
            <h3><a href='/cards/${count}'>${ele.Name.toUpperCase()}</a></h3>
            <p>Type: <a href='/${ele.Type.toLowerCase()}?/?'>${ele.Type}</a></p>
            <p>Elixir Cost: ${ele.ElixirCost}</p>
            <p>Rarity: ${ele.Rarity}</p>
            <p>Arena: ${ele.Arena}</p>
            <p style="width:500px">${ele.Summary}</p>
            <hr>
        </div>
        `
        count++;
    });
    res.send(`<h1 style="text-align:center; margin:20px;">ALL CARDS</h1><ul style='list-style-type: none;'>${html}</ul>`)
});

// ==== Each Cards Can check with number and name ====
router.get('/cards/:cardsID',(req, res)=>{
    let html = '';
    var cardsIndex = 0;
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