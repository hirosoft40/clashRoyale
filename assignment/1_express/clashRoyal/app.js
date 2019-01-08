const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/buildings'));
app.use(require('./routes/spells'));


app.listen(3000,()=>{
    console.log('Listening on port 3000')
});
