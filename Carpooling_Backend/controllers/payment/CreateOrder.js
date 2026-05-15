const Razorpay = require("razorpay")
const Ride = require("../../models/RideModel")
const Payment = require("../../models/PaymentModel")
const PassengerRide = require("../../models/PassengerRideModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const key_id = process.env.key_id
const key_secret = process.env.key_secret

var instance = new Razorpay({ 
    key_id: key_id, 
    key_secret: key_secret 
   })


const CreateOrder = async(req,res)=>{
    
    try{
        
        const id = req.params.id  //ride id
        
        // const rideId  = req.body.id;
        const rideInformation =  await Ride.findById({_id:id})
        
        var price = rideInformation.price
        
        const token = req.headers.authorization.split(" ")[1]
        const decodeToken =  jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decodeToken)
        
        
        // Payment was already done but it was pending, so user should complete the payment instead of creating new order
        const PrevPendingPaymentResponce = await Payment.findOne({
            userId:decodeToken.userId,
            rideInfo:id,
            status:"pending"
        }).populate("rideInfo")

        console.log(PrevPendingPaymentResponce)

        if(PrevPendingPaymentResponce){

              return res.status(200).json({
                data:{
                    orderId:PrevPendingPaymentResponce.orderId,
                    amount:PrevPendingPaymentResponce.amount, 
                    currency:PrevPendingPaymentResponce.currency, 
                    keyId:key_id
                },
                message:"Yor Payment is Pending Please clear the Pending Payment"
              })

        }



        const responce = await instance.orders.create({
        amount: price*100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        notes: {
            "comment":"The Order is created"
         }
        })
        
        console.log(responce)



        let data={
            orderId:responce.id,
            amount:responce.amount, 
            currency:responce.currency, 
            keyId:key_id
        }
        
        console.log(data)

        console.log("Order Created")


        const PaymentResponce = await Payment.create(
             {
                orderId:responce.id,
                userId:decodeToken.userId,
                currency:responce.currency, 
                amount:responce.amount, 
                rideInfo:id,
                status:"pending"
             }).populate("rideInfo")
        
        if(!PaymentResponce){
            return res.status(400).json({
                message:"Payment Responce Not created"
            })
        }
        
        console.log(PaymentResponce)

        return res.status(200).json({
            data:data,
            message:"Order Created Successfully"
        })

        
    }
    catch(error){
        console.log("RAZORPAY API ERROR:");
        console.error(error); 
        return res.status(500).json({
            error: error.message,
            message:"Failed to create Order"
        })
    }

}





module.exports = {CreateOrder}


