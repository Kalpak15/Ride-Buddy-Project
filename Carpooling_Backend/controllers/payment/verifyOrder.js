const Razorpay = require("razorpay")
const crypto = require("crypto")
const Ride = require("../../models/RideModel")
require("dotenv").config();

var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })

const verifyOrder = async(req,res)=>{
      
     try{
          
          const id = req.params.id
        //   console.log(id)
          
          const rideInfo = await Ride.findById({_id:id})
        //   console.log(rideInfo)

          const {razorpay_payment_id, razorpay_order_id,razorpay_signature} = req.body
          
        //   console.log(razorpay_payment_id, razorpay_order_id,razorpay_signature)

          if(!razorpay_payment_id 
            || !razorpay_order_id 
            || !razorpay_signature){
                return res.status(404).json("All feilds should required")
            }
            
            var key_secret = process.env.key_secret
            const generated_signature = crypto
                    .createHmac("sha256", key_secret)
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
                bookingDetails:rideInfo,
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