const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Player = require('../models/player')
const request = require('request');
const mongoose = require('mongoose')
const champions = require('../champions')
const bcrypt = require('bcrypt-nodejs')
const db = "mongodb://userazuh:okokyt@ds137600.mlab.com:37600/seekplayersdb"
 
mongoose.connect(db, err => {
    if (err) {
        console.log('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
})
 
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unautorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unautorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unautorized request')
    }
    req.userId = payload.subject
    next()
}
 
router.get('/', (req, res) => {
    res.send('From API route')
});
 
router.get('/champions', (req, res) => {
    res.json({ champions });
})
 
router.post('/register', (req, res) => {
    let userData = req.body
    userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8), null);
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            res.status(400).json({message: "Your email is invalid"})
        } else {
            let payload = {
                subject: registeredUser._id
            }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).json({
                token,
                payload,
                user: registeredUser
            })
        }
    })
})
 
router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({
        email: userData.email
    }).populate('playercard').exec((error, user) => {
        if (error) {
            res.status(400).json({message: "Your email or password is invalid"})
        } else {
            if (!user) {
                res.status(401).json({message: 'Invalid email'})
            } else {
                if (!bcrypt.compareSync(userData.password, user.password)) {
                    res.status(401).json({message: 'Invalid password'})
                } else {
                    let payload = {
                        subject: user._id
                    }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({
                        token,
                        user
                    })
                }
            }
        }
    })
})
 
 
router.put('/account', (req, res) => {
    let userData = req.body;
    User.findOne({
        _id: userData.id
    }).exec((error, user) => {
        if (error) {
            res.status(401).json({message: 'User not found'})
        } else {
            user.email = userData.email;
            user.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8), null);
            user.save(function (err) {
                if (err) {
                    return res.status(400).json({message: 'Invalid email'})
                }
                res.status(200).json({
                    message: 'Account updated'
                })
            })
        }
    })
})
 
router.put('/newuser', (req, res) => {
    let newCardData = req.body;
    Player.findOne({
        creator: newCardData.creator
    }, (err, player) => {
        if (err) {
            res.send(err);
        } else {
            player.pseudo = newCardData.pseudo;
            player.rank = newCardData.rank;
            player.server = newCardData.server;
            player.mainchamp = newCardData.mainchamp;
            player.role = newCardData.role;
            player.save(function (error) {
                if (error) {
                    res.send(error)
                }
                res.send({
                    message: 'Player updated'
                })
            })
        }
    })
})
 
 
router.delete('/account/:id', (req, res) => {
    User.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            console.log('error');
        }
    })
})
 
router.get('/players', (req, res) => {
    Player.find(function (err, players) {
        if (err) {
            res.send(err)
        }
        res.json(players)
    })
})
 
 
router.delete('/newuser/:id', (req, res) => {
    let id = req.params.id;
    Player.findOneAndRemove({
        creator: id
    }, function (err, player) {
        if (err) {
            res.send(err);
        }
        User.findOne({ playercard: player._id }, (err, user) => {
            user.playercard = null;
            user.save();
        })
        res.json({ success: true, message: 'Your card has been deleted' });
    })
})
 
router.post('/newuser', (req, res) => {
    let cardData = req.body
    let player = new Player(cardData)
    player.save((err, new_Player) => {
        if (err) {
            console.log(err);
        } else {
            User.findOne({
                _id: cardData.creator
            }, function (err, user) {
                user.playercard = new_Player;
                res.status(200).json({ user: user,
                message: 'Your card has been created' })
                user.save();
            })
        }
    })
})
 
module.exports = router