const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
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
                token
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
                        token
                    })
                }
            }
        }
    })
})

router.put('/account', (req, res) => {
    let userData = req.body;
    User.findOne({_id: userData._id}, (error, res) => {
        if (error) {
            console.log(error);
        } else {
            user.email = userData.new_UserData.email;
            user.password = userData.new_UserData.password;
            user.save ( function(err) {
                if (err) {
                    res.send(err)
                }
                res.send({message: 'Account updated'})
            })
        }
    })
})

router.get('/players', (req, res) => {
    let players = [{
            "_id": "1",
            "name": "Thibault",
            "description": "im thibault",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "2",
            "name": "Marine",
            "description": "im marine",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "3",
            "name": "Momo",
            "description": "im momo",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "4",
            "name": "Florian",
            "description": "im florian",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "5",
            "name": "Amanda",
            "description": "im amanda",
            "date": "2016-03-12T11:00:00Z"
        }
    ]
    res.json(players)
})

router.get('/special', verifyToken, (req, res) => {
    let specialPlayers = [{
            "_id": "1",
            "name": "Thibault",
            "description": "im thibault",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "2",
            "name": "Marine",
            "description": "im marine",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "3",
            "name": "Momo",
            "description": "im momo",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "4",
            "name": "Florian",
            "description": "im florian",
            "date": "2016-03-12T11:00:00Z"
        },
        {
            "_id": "5",
            "name": "Amanda",
            "description": "im amanda",
            "date": "2016-03-12T11:00:00Z"
        }
    ]
    res.json(specialPlayers)
})

module.exports = router