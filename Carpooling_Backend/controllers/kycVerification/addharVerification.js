const axios = require('axios');
const User = require('../../models/UserModel');

const addharKycVerification = async(req,res)=>{
    try{
        
        const {customer_identifier,customer_name,template_name} = req.body
        
        console.log(req.body)

        if(!customer_identifier || !template_name){
            return res.status(400).json({
                message:"The information is incomplete.Please fill all info"
            })
        }
        
        console.log("recieve info")
        
        if(template_name!== "OfflineKyc"){
            return res.status(400).json({
                message:"Wrong Template Name"
            })
        }

        console.log("recieve info2")

        const responce = await axios.post(
            "https://ext.digio.in:444/client/kyc/v2/request/with_template",
            // https://ext.digio.in:444

            // https://api.digio.in/client/kyc/v2/request/with_template"
            {
                customer_identifier:customer_identifier,
                customer_name:customer_name,
                generate_access_token: true,
                template_name:template_name
            },
            {
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                }
            }
        )
        
        console.log(responce.data)

    
             
        if(responce.status === 200){
            
            await User.findOneAndUpdate({customer_identifier},{isKycVerified:true})
            console.log(responce)
            return res.status(200).json({
                message:"KYC verification successful",
                data:responce.data
            })
        }else{
            return res.status(400).json({
                message:"KYC verification failed",
                error:responce.data
            })
        }
        
        
    }
    catch(error){
        return res.status(400).json({
            message:"Not able to verify KYC",
            error:error.message
        })
    }
}


module.exports = {addharKycVerification}