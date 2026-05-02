const Razorpay = require("razorpay")
const crypto = require("crypto")
require("dotenv").config();

var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })

const verifyOrder = async(req,res)=>{
      
     try{
          const {razorpay_payment_id, razorpay_order_id,razorpay_signature} = req.body
          if(!razorpay_payment_id 
            || !razorpay_order_id 
            || !razorpay_signature){
                return res.status(404).json("All feilds should required")
            }
            
            const key_secret = process.env.key_secret
            const generated_signature = crypto
                    .createHmac("sha256", secret)
                    .update(razorpay_order_id + "|" + razorpay_payment_id)
                    .digest("hex");
            
                    console.log(generated_signature)
                    console.log(razorpay_signature)
            
            if(generated_signature!==razorpay_signature){
                return res.status(500).json({
                    message:"Invalid Signature"
                })
            }

            return res.status(200).json({
                message:"Payment is recieve Successfully"
            })
            
        }
        catch(error){
            return res.status(500).json({
                message:"Error Occured During recieving payment",
                data:error.message
            })

     }
     

}
module.exports = {verifyOrder}