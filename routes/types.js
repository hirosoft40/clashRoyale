const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');

router.get('/types', (req, res)=>{
    res.redirect('/cards');
});

// Types Cards
router.get('/types/:typeID/',(req, res)=>{
    let typeID = req.params.typeID;

    //error handling
    if (parseInt(typeID)) res.send('cards','URL Error: Please type in proper type name.'); 

    db.cards.findAll({
        include: [
            {model:db.types           
                , where: [{ name: { [Sequelize.Op.iLike]: `%${typeID}%` }}]
                , required:true
            }
            , { model:db.rarities,requiredx:true}
            , { model:db.arenas,required:true}
            , { model:db.elixircosts, required:true}
        ]
    }).then(results => {
        // console.log(results[0])
        if (results.length>0){
            res.render('cards',{
                cards: results,
                bodyClass:"types",
                pageID: typeID.toUpperCase()
            });
        } else{
            res.render('error',{
                message:'No results found',
                bodyClass:"types",
                pageID: 'ERROR'
            });
        }  
    });
});

// ====== Arena Cards
router.get('/arenas', (req, res)=>{
    res.redirect('/cards');
});

router.get('/arenas/:arenaID/',(req, res)=>{
    let arenaID = req.params.arenaID;
    let num = arenaID.match(/\d+/g)?parseInt(arenaID.match(/\d+/g).join(""))+1:1;
    
    db.cards.findAll({
        include: [
        {model:db.types,required:true}
        , { model:db.rarities,requiredx:true}
        , { model:db.arenas,required:true}
        , { model:db.elixircosts, required:true}
        ]
        , where: {arena_id: {[Sequelize.Op.eq]: num}}
    }).then(results => {
        // console.log(results.length)
    if (results.length>0){
        res.render('cards',{
            cards: results,
            bodyClass:"arena",
            pageID: `${results[0].arena.arenaName.toUpperCase()}`
        });
    } else{
        res.render('error',{
            message:'No results found',
            bodyClass:"arena",
            pageID: 'ERROR'
        });
    }  
    });
});


// Rarity Cards
router.get('/rarity', (req, res)=>{
    res.redirect('/cards');
});

router.get('/rarity/:rarityID/',(req, res)=>{
    let rarityID = req.params.rarityID;

    //error handling
    if (parseInt(rarityID)) res.send('cards','URL Error: Please type in proper rarity name.'); 

    db.cards.findAll({
        include: [
        {model:db.types,required:true}
        , { model:db.rarities
            ,where: [{ name: { [Sequelize.Op.iLike]: `%${rarityID}%` }}]
            ,requiredx:true}
        , { model:db.arenas,required:true}
        , { model:db.elixircosts, required:true
        }]
    }).then(results => {
        if (results.length>0){
            res.render('cards',{
                cards: results,
                bodyClass:"rarity",
                param:false,
                pageID: rarityID.toUpperCase()
            });
        } else{
            res.render('error',{
                message:'No results found',
                bodyClass:"rarity",
                pageID: 'ERROR'
            });
        }  
    });

});

module.exports = router;