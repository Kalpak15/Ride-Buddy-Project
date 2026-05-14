const mongoose = require("mongoose")

const paymentSchema  = new mongoose.Schema({
      
      orderId:{
         type:String,
      },
      paymentId:{
         type:String,
         default:null
      },
      userId:{
         type:String,
      },
      currency:{
         type:String,
      },
    amount:{
        type:Number,
     },
     rideInfo:{
        type:mongoose.Schema.Types.ObjectId
     },
     status:{
        type:String,
        enum:["pending","success","failed"],
        default:"null"
     }
})

module.exports =  mongoose.model("Payment",paymentSchema)
