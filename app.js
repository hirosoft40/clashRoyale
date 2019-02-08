const express = require('express');
const app = express();
// const dataFile = require('./data/json/clashRoyaleData.json');
// const socket = require('socket.io');
const db = require('./models/')
const flash = require('connect-flash');
const session = require('express-session')
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// ==== Server set up 
const http = require('http').Server(app);
const io  = require('socket.io')(http);

// Passport config
require('./config/passport')(passport);

// app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static files
app.use(express.static('public'));

// === bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var myStore = new SequelizeStore({db:db.sequelize});

// Express session
app.use(session({
    secret: 'secret login',
    store: myStore,
    resave: true,
    saveUninitialized: true,
    proxy:true
}))

// myStore.sync();
// db.sequelize.sync();

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// ==== Local Variables ===
// header info
app.locals.pageTitle = 'Clash Royale Community';

// flash
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    if(req.user){
        res.locals.loginname = req.user["username"];
        console.log('My name is', res.locals.loginname)
        } else{
        res.locals.loginname = "";

        }
    next();
})


// NAV bar
db.types.findAll({attributes: ['name']}).then(data=> {app.locals.uniqueType = [...new Set(data.map(item => item.name))]})
db.rarities.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueRarity = [...new Set(data.map(item => item.name))]})
db.arenas.findAll({attributes: ['name']}).then(data=>{app.locals.uniqueArena = [...new Set(data.map(item => item.name))]})

// ==== routes
app.use(require('./routes/index'));
app.use(require('./routes/cards'));
app.use(require('./routes/types'));
app.use(require('./routes/api'));
app.use(require('./routes/search'));
app.use('/auth',require('./routes/auth'));


//server
// const PORT = process.env.PORT || 3500;
// const server = app.listen(PORT, function(){
//     console.log(`Server started on port ${PORT}.`)
// })
// app.set('port', process.env.PORT || 3500);


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


http.listen(process.env.PORT || 3500, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});