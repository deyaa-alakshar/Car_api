const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");



const User = require('../models/userSchema');
const Rentcar = require('../models/rentcarSchema');
const Rentcart = require('../models/rentcartSchema');
const Rentcarincomes = require('../models/rentcarIncomeSchema');


module.exports = router.post('/updateRentDataBase', authenticate, async(req, res)=>{
    const getRentedcars = req.body.items;
    let rentedcarPrice, rentedcarId, rentedcarHours, rentedcarBrand, rentedcarModel;
    
    getRentedcars.map(getRentedcars=>{
        rentedcarPrice = getRentedcars.totalbill;
        rentedcarId = getRentedcars.rentcarid;
        rentedcarHours = getRentedcars.requiredhours;
        rentedcarBrand = getRentedcars.brand;
        rentedcarModel = getRentedcars.model;
    })
    
    const findUser = await User.findOne({_id: req.userID});
    const findUserByID = findUser._id;
    const findcar = await Rentcar.findOne({_id: rentedcarId});
    const cartData = await Rentcart.findOne({userById: findUserByID});
    const cartId = cartData._id;
    const carById = findcar._id; 
    const rentcarBuyedPrice = findcar.price;

    try {
        
        const newincome = new Rentcarincomes({
            userById : findUser,
            soldItems: [{
                productId : carById, 
                bookedHours : rentedcarHours, 
                brand : rentedcarBrand, 
                model : rentedcarModel, 
                retailPricePerItem : rentcarBuyedPrice, 
                totalIncome : rentedcarPrice
            }]
        });

        await newincome.save();

        
        await Rentcart.deleteOne({"_id": cartId});
        
    }
    catch(error) {
        res.status(500).send(error.message);
    }

})