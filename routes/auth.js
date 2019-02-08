const express = require('express');
const router = express.Router();
const db = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
// const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);


// login get
router.get('/login', (req, res) => 
    res.render('login', {bodyClass: "login"})
);

// register page
router.get('/register',(req, res)=> res.render('register'))

router.post('/register',(req, res)=>{
    const {username, password, password2, email} = req.body;
    let errors =[];
    if (!username || !email || !password || !password2){
        errors.push({msg:"Please fill in all fields."})
    }
    if (password !== password2){
        errors.push({msg:"Passwords do not match"})
    }
    if (password.length < 6){
        errors.push({msg:"Passwords should be at least 6 characters"})
    }

    if (errors.length > 0){
        res.render('register',{
            errors,
            username,
            email,
            password,
            password2
        })
    } else {
        db.users.findOne({
            where: {
                username: {[Sequelize.Op.eq]: username}
                }
        }).then(user => {
            if(user){
            errors.push({msg:'Username already exist. Please choose different username.'})
            res.render('register',{
                errors,
                username,
                email,
                password,
                password2
            });
            }else{
                // const newUser = new User({
                //     username,
                //     email,
                //     password
                //   });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        console.log(password, salt, hash)
                        db.users.create({
                            username
                            , password_hash: hash
                            , password_salt: salt
                            , email
                        })
                        .then(results => {
                            req.flash('success_msg','Username successfully created and can log in.')
                            res.redirect('/auth/login');         
                        })
                        .catch(errors => {
                            req.flash('error_msg',`Error: ${errors}`);
                            res.redirect('/auth/login');         
         
                        })
                    });
                });
            }
        })
    }
});

//logout
router.get('/logout', function(req, res, next){
    req.logout();
    req.flash('success_msg', "You are logged out")
    res.redirect('/auth/login')
});

router.get('/message', (req,res)=>{
    res.render('message')
})

router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }), (req, res, next)=>{
        if(!req.user){
            req.flash('error_msg', "Login failed. Please double check your information")
            res.redirect('/auth/login')
        } else {
            req.flash('success_msg', "Login success.")
            res.redirect('/')
        }
});

// router.get('/chat', passport.authenticate('local', {
//     failureRedirect: '/auth/login',
//     failureFlash: true
// }), (req, res, next) => {    
//     console.log(req.user);
//     if (!req.user) {
//         req.flash('error_msg', "Login failed. Please double check your information")
//         res.redirect('/auth/login')
//     } else {
//         res.render('chat',{
//             pageID:'chat',
//             bodyClass:'chat',
//             username: req.user["username"]
//         })
//     }
//     next();
// });


module.exports = router;