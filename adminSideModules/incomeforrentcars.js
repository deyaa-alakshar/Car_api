const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentcarincomes = require('../models/rentcarIncomeSchema');

module.exports = router.get('/getrentcarincome', async (req, res) =>{
    const allIncomes = await Rentcarincomes.find();

    console.log(allIncomes);
    try{
        
        res.status(200).send(allIncomes);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});
