const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentcar = require('../models/rentcarSchema');

module.exports = router.get('/getAvailableRentcars', async (req, res) =>{
    const allRentcars = await Rentcar.find();

    try{
        
        res.status(200).send(allRentcars);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});