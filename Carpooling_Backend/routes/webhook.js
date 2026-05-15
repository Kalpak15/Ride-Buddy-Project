const express = require("express")
const router = express.Router();

const {paymentWebHook} = require("../controllers/webhook/paymentWebHook")


router.post("/payments",paymentWebHook)


module.exports = router

