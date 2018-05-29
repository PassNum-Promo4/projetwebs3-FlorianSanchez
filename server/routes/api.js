const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Player = require('../models/player')
const mongoose = require('mongoose')
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
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = {
                subject: registeredUser._id
            }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({
                token,
                payload
            })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({
        email: userData.email
    }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
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
        _id: userData._id
    }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            user.email = userData.new_UserData.email;
            user.password = userData.new_UserData.password;
            user.save(function (err) {
                if (err) {
                    res.send(err)
                }
                res.send({
                    message: 'Account updated'
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
    Player.find(function (err, players){
        if (err) {
            res.send(err)
        }res.json(players)
    })  
})

router.get('/special', verifyToken, (req, res) => {
    let specialPlayers = []
    res.json(specialPlayers)
})

router.post('/newuser', (req, res) => {
    let cardData = req.body
    let player = new Player(cardData)
    player.save((err, new_Player) => {
        if (err) {
            console.log(err);
        } else {
            User.findOne({_id: cardData.creator}, function (err, user){
                user.playercard = new_Player;
            })
        }
    })
    res.send('Player card created')
})
module.exports = router