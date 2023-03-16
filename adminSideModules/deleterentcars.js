const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Rentcar = require('../models/rentcarSchema');


module.exports = router.post('/deleteRentcarFromDashboard', async (req, res)=>{
    const getId = req.body.carIdFromDashBoard
    const x = getId
    const findcar = await Rentcar.findOneAndDelete({_id: x});
    res.json(findcar);

    
})