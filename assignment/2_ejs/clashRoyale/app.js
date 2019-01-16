const express = require('express');
const app = express();
const dataFile = require('./data/clashRoyaleData.json');
const socket = require('socket.io');

// const http = require('http').Server(app);
const server = app.listen(3500, function(){
    console.log('Listening on port 3500.')
})

app.set('port', process.env.PORT || 3500);
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');


// header info
app.locals.pageTitle = 'Clash Royale Community';
app.locals.uniqueType = [...new Set(dataFile.cards.map(item => item.Type))];
app.locals.uniqueRarity = [...new Set(dataFile.cards.map(item => item.Rarity))];
app.locals.uniqueArena = [...new Set(dataFile.cards.map(item => item.Arena.trim()))];

// Static files
app.use(express.static('public'));

// routes
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/types'));
app.use(require('./routes/api'));
app.use(require('./routes/search'));
// app.use(require('./routes/chat'));
// app.use(require('./routes/rarity'));
// app.use(require('./routes/arenas'));
// app.use(require('./routes/feedback'));


const io  = socket(server);
// io.attach(server);
io.on('connection', function(socket) {
    console.log('made socket connetcion', socket.id)

    // handle chat event
    socket.on("chat", data => {
        // all ppls connected to sockets server
        io.sockets.emit('chat',data);
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

});
