const Razorpay = require("razorpay")
const Ride = require("../../models/RideModel")
require("dotenv").config()

const key_id = process.env.key_id
const key_secret = process.env.key_secret

var instance = new Razorpay({ 
    key_id: key_id, 
    key_secret: key_secret 
   })


const CreateOrder = async(req,res)=>{
    
    try{
        
        const id = req.params.id
        
        // const rideId  = req.body.id;
        const rideInfo =  await Ride.findById({_id:id})
        
        var price = rideInfo.price
        
        const responce = await instance.orders.create({
        amount: price*100,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            "comment":"The Order is created"
        }
        })

        let data={
            orderId:responce.id,
            amount:responce.amount, 
            currency:responce.currency, 
            keyId:key_id
        }
        
        console.log(data)

        console.log("Order Created")

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