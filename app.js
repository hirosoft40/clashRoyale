const express = require('express');
const app = express();
// const dataFile = require('./data/json/clashRoyaleData.json');
const socket = require('socket.io');
const db = require('./models/')
const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const http = require('http').Server(app);
const server = app.listen(3500, function(){
    console.log('Listening on port 3500.')
})

app.set('port', process.env.PORT || 3500);
// app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');

// header info
app.locals.pageTitle = 'Clash Royale Community';

// NAV bar
db.types.findAll({attributes: ['name']}).then(data=> {app.locals.uniqueType = [...new Set(data.map(item => item.name))]})
db.rarities.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueRarity = [...new Set(data.map(item => item.name))]})
db.arenas.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueArena = [...new Set(data.map(item => item.name))]})

// Static files
app.use(express.static('public'));

// routes
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/types'));
app.use(require('./routes/api'));
app.use(require('./routes/search'));

// 

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
