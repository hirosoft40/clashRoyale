const express = require('express');
const app = express();
const dataFile = require('./data/clashRoyaleData.json');


app.set('port', process.env.PORT || 3500);
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');


// header info
app.locals.pageTitle = 'Clash Royale Community';
app.locals.uniqueType = [...new Set(dataFile.cards.map(item => item.Type))];
app.locals.uniqueRarity = [...new Set(dataFile.cards.map(item => item.Rarity))];
app.locals.uniqueArena = [...new Set(dataFile.cards.map(item => item.Arena.trim()))];


app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/types'));
app.use(require('./routes/rarity'));
app.use(require('./routes/arenas'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));




// app.listen(app.get('port'),()=>
//     console.log(`Listening on port ${app.get('port')}`)
// );
app.listen(3500,()=>{
    console.log('Listening on port 3500.')
});