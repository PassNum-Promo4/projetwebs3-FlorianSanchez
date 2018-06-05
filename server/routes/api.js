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
 
mongoose.connect(db, err => {               //connecting to mongodb
    if (err) {
        console.log('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
})
 
function verifyToken(req, res, next) {          //verify token on local storage
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
 
router.get('/', (req, res) => {         //routes principal
    res.send('From API route')
});
 
router.get('/champions', (req, res) => {            //routes to get champions list
    res.json({ champions });                        // return champions tab
})
 
router.post('/register', (req, res) => {        //routes for register an User with a hash password
    let userData = req.body
    userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8), null);
    let user = new User(userData)                   //create an user with a User model
    user.save((error, registeredUser) => {          //save an user on registeredUser
        if (error) {
            res.status(400).json({message: "Your email is invalid"})        
        } else {
            let payload = {
                subject: registeredUser._id     //save registeredUSer id on payload
            }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).json({          // return payload 
                token,
                payload,
                user: registeredUser
            })
        }
    })
})
 
router.post('/login', (req, res) => {               // routes for loign and populate the dataUser for card
    let userData = req.body
    User.findOne({                                  // find user with a property email
        email: userData.email
    }).populate('playercard').exec((error, user) => {       // populate property playercard on user then exec callback 
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
                    let token = jwt.sign(payload, 'secretKey')  //return token and user with a id payload
                    res.status(200).send({
                        token,
                        user
                    })
                }
            }
        }
    })
})
 
 
router.put('/account', (req, res) => {          // routes for modified account email and password
    let userData = req.body;            
    User.findOne({                              //find user with id 
        _id: userData.id
    }).exec((error, user) => {
        if (error) {
            res.status(401).json({message: 'User not found'})
        } else {
            user.email = userData.email;            //change value email
            user.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8), null); //change value password
            user.save(function (err) {              //save the new value email, password
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
 
router.put('/newuser', (req, res) => {          //routes for modify a card 
    let newCardData = req.body;
    Player.findOne({                            // find the card    
        creator: newCardData.creator
    }, (err, player) => {
        if (err) {
            res.send(err);
        } else {
            player.pseudo = newCardData.pseudo;     //send new values to playercard
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
 
 
router.delete('/account/:id', (req, res) => {         //routes for deleting account user
    User.remove({
        _id: req.params.id                      // remove the account with the _id corresponding
    }, function (err) {
        if (err) {
            console.log('error');
        }
    })
})
 
router.get('/players', (req, res) => {              //routes for display all card players
    Player.find(function (err, players) {           // find the player and return players tab
        if (err) {
            res.send(err)
        }
        res.json(players)
    })
})
 
 
router.delete('/newuser/:id', (req, res) => {           //routes for deleting card player
    let id = req.params.id;
    Player.findOneAndRemove({                       //find and remove the player when id = creator
        creator: id
    }, function (err, player) {
        if (err) {
            res.send(err);
        }
        User.findOne({ playercard: player._id }, (err, user) => {       //reset id playercard on user object
            user.playercard = null;
            user.save();
        })
        res.json({ success: true, message: 'Your card has been deleted' });
    })
})
 
router.post('/newuser', (req, res) => {         //routes for creating a card player
    let cardData = req.body
    let player = new Player(cardData)           // create card with a model Player
    player.save((err, new_Player) => {             
        if (err) {      
            console.log(err);
        } else {
            User.findOne({
                _id: cardData.creator           //save the data on card to playercard property of user
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