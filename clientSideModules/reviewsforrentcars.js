const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Rentcar = require('../models/rentcarSchema');
const Rentcarreviews = require('../models/rentcarreviewSchema');

let getReviewRentcarId;

module.exports =router.post('/sendReviewRentcarId', async (req, res) =>{
    getReviewRentcarId = req.body.selectedcarId
}),



module.exports = router.get('/getRentcarReviews', async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findcar = await Rentcar.findOne({_id: getReviewRentcarId.id});

    const data = {findcar,findUser}
    
    try{
        
        res.status(200).send(data);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
}),


module.exports = router.get('/getallreviewsforselectedrentcar', authenticate, async (req, res) =>{

    const findAllReviews = await Rentcarreviews.findOne({carById: getReviewRentcarId.id});
    
    try{
        
        res.status(200).send(findAllReviews);

    }catch(error) {
        res.status(400).send(error.message);
    }
}),


module.exports = router.post('/postrentcarreviews', authenticate, async (req, res)=>{

    const {id, name, email, message, selectedcarId} = req.body;
    const findcar = await Rentcar.findOne({_id: selectedcarId.id});
    const findcarId = findcar._id;
    const findcarReview = await Rentcarreviews.findOne({carById: findcarId})
   

    try {
        
        if(findcarReview){
            const carReviewId = findcarReview.carById
            if(carReviewId.equals(findcarId)){
                    findcarReview.allReviews.push({
                    userById : id, 
                    name : name, 
                    email : email, 
                    comments : message,
               });
            }
            await findcarReview.save();
            res.status(201).send({ message: "review submited successfully"});
        }
        else{
            const newReview = new Rentcarreviews({
                carById : findcar,
                allReviews: [{
                userById : id, 
                name : name, 
                email : email, 
                comments : message, 
                }]
            });

            await newReview.save();
            res.status(201).json({ message: "review submited successfully"});
        }
    }
    catch(error) {
        res.status(500).send(error.message);
    }
})