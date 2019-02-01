const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');

router.get('/search',(req, res)=>{
    let searchID = req.query.search

    db.cards.findAll({
        include: [
        {model:db.types,required:true}
        , { model:db.rarities,requiredx:true}
        , { model:db.arenas,required:true}
        , { model:db.elixircosts, required:true
        }]
        ,where: {
            name: {[Sequelize.Op.iLike]: `%${searchID}%`}
          }
    }).then(results => {
        if (results.length>0){
            res.render('cards',{
                cards: results,
                bodyClass:"rarity",
                param:false,
                pageID: "search results".toUpperCase()
            });
        } else{
            res.render('error',{
                bodyClass:"error",
                param:false,
                pageID: "No results found".toUpperCase()
            });        }  
    });
});

module.exports = router;