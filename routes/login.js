const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Sequelize = require('sequelize');;

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(cookieParser());

// db.users.sync();
// sequelize initialization
var myStore = new SequelizeStore({
    db: db.sequelize
})

router.use(session({
    secret: 'this is our secret',
    store: myStore,
    resave: false,
    proxy: true
}))
myStore.sync();

// passport initialization
router.use(passport.initialize());
router.use(passport.session());

// login get
router.get('/login', (req, res) => {
    res.render('login', {bodyClass: "login"})
});


router.get('/logout', function (req, res, next) {
    req.session.destroy(err => {
        if (err) return next(err)
        req.logout();
        res.render('index')
    })
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: 'message'
}), (req, res) => {
    // console.log('hehe',req.user["username"])
    if (req.user) {
        res.render('index', {
            bodyClass: "index"
            ,username:req.user["username"]
            ,hide:'true'
        })
    } else {
        res.redirect('login', {bodyClass: "login"})
    }
})

// chat
// router.get('/chat', passport.authenticate('local', {
//     failureRedirect: 'message'
// }), (req, res) => {    
//     if (req.user) {
//         res.render('chat',{
//             pageID:'chat',
//             bodyClass:'chat',
//             username:req.user["username"]
//     })
//     } else{
//         res.render('message',{topMsg:'Could not log in. Please check username and password.'})
//     };
// });

passport.use(new LocalStrategy((username, password, done) => {
    // console.log('Im in passport');
    db.users.findOne({
        where: {
            username: {[Sequelize.Op.eq]: username}
        }
    })
    .then(results => {
        if (results && results.length != 0) {
            const data = results;
            console.log(results)

            bcrypt.compare(password, data.password_hash, (err, res) => {
                console.log('res',res)
                if (res) {
                    done(null, {
                        id: data.id,
                        username: data.username                    
                    })
                } else {
                    done(null, false,{
                        message:'Incorrect username.',
                    })
                }
            })
        } else {
            done(null, false)
        }
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.username)
});

passport.deserializeUser((username, done) => {
    //changed to find by username and not by id
    db.users.findOne({
        where: {username: username}
    }).then((data) => {
        done(null, data)
    })
})



module.exports = router;