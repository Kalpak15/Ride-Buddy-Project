const express = require("express")

const router = express.Router()

const {CreateOrder} = require("../controllers/payment/CreateOrder")
const {verifyOrder} = require("../controllers/payment/verifyOrder")

router.post("/create-order/:id",CreateOrder)
router.post("/verify-order/:id",verifyOrder)

module.exports = router
