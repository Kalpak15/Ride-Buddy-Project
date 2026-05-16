const express = require('express');
const router = express.Router()


const {addharKycVerification} = require("../controllers/kycVerification/addharVerification")
// Addhar Verification. 
router.post("/addhar", addharKycVerification)

module.exports = router