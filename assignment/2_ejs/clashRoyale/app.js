const express = require('express');
const app = express();
const dataFile = require('./data/clashRoyaleData.json')

app.set('port', process.env.PORT || 3000);
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.locals.allCards = dataFile.cards;

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/buildings'));
app.use(require('./routes/spells'));
app.use(require('./routes/troops'));


// app.listen(app.get('port'),()=>
//     console.log(`Listening on port ${app.get('port')}`)
// );
app.listen(3500,()=>{
    console.log('Listening on port 3500.')
});