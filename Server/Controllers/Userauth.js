const Game = require('../Models/UserSchema')
const express = require('express');
const router = express.Router();

const updateGame = async(req, res, next) => {
    console.log(req.body);
    try{
        if(!req.body.awardPoints) {
        return res
            .status(401)
            .json({ msg: "Not Authorized!" });
        }
        let newScore = {
            teamScore: req.body.awardPoints,
        };
        let updatedScore = await Game.create(newScore);

        return res.status(200).json({ updatedScore, msg: "Good job!" });
    } catch (error) {
        console.log("🚀 ~ file: Userauth.js ~ line 7 ~ regUser ~ error", error)
    }
};

// router.route('/update/:id').put((req, res, next) => {
//     user.findByIdAndUpdate(req.params.id, {
//         $set: req.body 
//     }, (error, data) => {
//         if (error) {
//         return next(error);
//         console.log(error);
//     } else {
//         res.json(data)
//         console.log('User Successfully Updated')
//     }
//     })
// });

module.exports = {
    router,
    updateGame
};