const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');


router.get('/cards',(req, res)=>{
    db.cards.findAll({
         include: [{
            model:db.types,
            required:true
        }, 
        {
            model:db.rarities,
            required:true
        },
        {
            model:db.arenas,
            required:true
        },
        {
            model:db.elixircosts,
            required:true
        }]
}).then(results => {
    // console.log(results[0])
        res.render('cards',{
            cards: results,
            bodyClass:"cards",
            param:false,
            pageID:'All Cards'.toUpperCase()
        });
    });
});


// ==== Each Cards Can check with number and name ====
router.get('/cards/:cardsID',(req, res)=>{

    let cardsID = req.params.cardsID;

    //error handling
    if (!parseInt(cardsID)) res.send('cards','URL Error: Please type in proper cards number.'); 

    db.cards.findAll({
        include: [
        {model:db.types,required:true}
        , { model:db.rarities,requiredx:true}
        , { model:db.arenas,required:true}
        , { model:db.elixircosts, required:true
        }]
        ,where: {
            id: {[Sequelize.Op.eq]: cardsID}
          }
    }).then(results => {
        if (results.length>0){
            res.render('cards',{
                cards: results,
                bodyClass:"cards",
                param:false,
                pageID: results[0].name.toUpperCase()
            });
        } else{
            res.redirect('/cards');        // if error, go back to all cards
        }  
    });
});

module.exports = router;