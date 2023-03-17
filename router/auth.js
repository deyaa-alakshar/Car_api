const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');



require('../database/conn');

router.use(cors());

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

router.get('/', (req, res) =>{
    res.send('home page router')
});


// Client Side Modules ---for-- SignIn, SignUp, SignOut, Contactform
router.use(require('../clientSideModules/signup'))
router.use(require('../clientSideModules/signin'))
router.use(require('../clientSideModules/signout'))
router.use(require('../clientSideModules/getdata'))
router.use(require('../clientSideModules/contactform'))
router.use(require('../clientSideModules/displayallrentcars'))
router.use(require('../clientSideModules/exploreallrentcars'))
router.use(require('../clientSideModules/rentcarsearch'))
router.use(require('../clientSideModules/reviewsforrentcars'))
router.use(require('../clientSideModules/addtocartforrentcars'))
router.use(require('../clientSideModules/displayrentcartdata'))
router.use(require('../clientSideModules/paymentmethoderentcars'))
router.use(require('../clientSideModules/updatedbafetrrentedcar'))






// Admin Side Modules---for--- SignIn, SignOut
router.use(require('../adminSideModules/signinadmin'))
router.use(require('../adminSideModules/signoutadmin'))
router.use(require('../adminSideModules/getadmindata'))

router.use(require('../adminSideModules/addrentcars'))
router.use(require('../adminSideModules/getallrentcars'))
router.use(require('../adminSideModules/incomeforrentcars'))
router.use(require('../adminSideModules/deleterentcars'))

// Admin Side Modules---for--- Users
router.use(require('../adminSideModules/deleteuser'))
router.use(require('../adminSideModules/getallusers'))

module.exports = router;