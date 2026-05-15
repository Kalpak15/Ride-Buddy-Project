const { createHmac } = require('node:crypto');
const Payment = require("../../models/PaymentModel")
require("dotenv").config()



const paymentWebHook = async(req,res)=>{
    try{

        console.log("Entered WebHook Endpoint")
        
        // const X_Razorpay_Signature = req.headers("X-Razorpay-Signature")
        const X_Razorpay_Signature = req.headers['x-razorpay-signature']
        
        console.log(X_Razorpay_Signature)
        
        const secret = process.env.WEBHOOK_SECRET;
        console.log("Entered WebHook Midpoint")
        
        const rawData = req.body.toString('utf-8');

        
        const Razorpay_Signature_Hash = createHmac('sha256', secret)
        .update(rawData)
        .digest('hex');
        console.log(Razorpay_Signature_Hash);
        
        console.log("Entered WebHook INbetween")
        
        if(X_Razorpay_Signature!==Razorpay_Signature_Hash){
            return res.status(400).json({
                message:"Invalid WebHook Signature"
            })
        }

        console.log("WebHook Signature Verified Successfully")

        const parseData = JSON.parse(rawData)
        const event = parseData.event
        const entity = parseData.payload.payment.entity

        const order_id = entity.order_id
        const payment_id = entity.id
        
        console.log(event)
        console.log(entity)

        if(event === "payment.failed"){
             
              await Payment.findOneAndUpdate(
                {orderId:order_id},
                {status:"failed",paymentId:payment_id},
                {new:true}
            )
              
            console.log("Payment Failed WebHook Processed")
        }
        
        
        return res.status(200).json({
            message:"WebHook Processed Successfully"
        })

      }
      catch(error){
        return res.status(500).json({
            error:error.message,
            message:"WebHook Processing Failed"
        })
      }

}

module.exports  = {paymentWebHook}