const dotenv = require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const User = require('../models/user-model');
const config = require('../../config')[process.env.NODE_ENV];

/**
 * USER
 * Access for role: ROLE_USER
 */
passport.use('user', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
}, async(payload, done) => {
    try {
    
        const user = await User.findOne({
            _id: payload.id,
            role: "ROLE_USER"
        })

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const authUser = passport.authenticate('user', {
    session: false,
})

/**
 * ADMIN
 * Access for role: ROLE_ADMIN
 */
passport.use('admin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
}, async(payload, done) => {
    try {
        const user = await User.findOne({
            _id: payload.id,
            role: "ROLE_ADMIN"
        })

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const authAdmin = passport.authenticate('admin', {
    session: false,
})

/**
 * Access for both roles
 */
passport.use('all', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
}, async(payload, done) => {
    try {
        const user = await User.findOne({
            _id: payload.id
        })
        if(!user) {
            return done(null, false)
        }
        done(null, user)
    } catch(error) {
        done(error, false)
    }
}))

const authAll = passport.authenticate('all', {
    session: false
})

module.exports = {
    authUser,
    authAdmin,
    authAll
}