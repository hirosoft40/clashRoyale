const LocalStrategy = require('passport-local').Strategy;
const db = require('./../models');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');;

module.exports = function (passport){
    passport.use(
        new LocalStrategy((username, password, done) => {
        // console.log('Im in passport');
        db.users.findOne({
            where: {
                username: {[Sequelize.Op.eq]: username}
            }
        })
        .then(results => {
            // console.log(results['username'])
            if (!results){
                return done(null, false, {message: 'That username is not registered'});
            }
            // password match
            const data = results;
            bcrypt.compare(password, data.password_hash, (err, isMatch)=>{
                if(err) throw err;
                if (isMatch){
                    return done(null, results);
                } else {
                    return done (null, false, {message:'Password incorrect'});
                }
            });
        });
    }));

    passport.serializeUser((user,done)=>{
        done(null, user.username)
    });
    
    passport.deserializeUser((username, done)=>{
        //changed to find by username and not by id
        db.users.findOne({where: {username: username}}).then((data)=>{
            done(null, data)
        });
    });
};
