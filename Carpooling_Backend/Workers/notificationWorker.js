require('dotenv').config({path:'../.env'})
const mongoose = require("mongoose")
const User = require("../models/UserModel")
const { Worker, Job } = require('bullmq')
const notificationQueue = require('../Queues/notificationQueue.js')
const IORedis = require('ioredis')
const { createNotification } = require("../controllers/notificationController");

mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
          console.log("Connected to MongoDB for Notification Worker");
        })
        .catch((error)=>{
          console.error("Error connecting to MongoDB for Notification Worker:", error);
        })

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});



const worker = new Worker('notificationQueue', async (job) => {
    
  await createNotification(
      job.data.user_id,
      job.data.message,
      job.data.type,
      job.data.sendMail,
    );
    
    console.log(`Notification send to the ${job.data.user_id}`)

  },{connection });


worker.on('completed',(job)=>{
    console.log(` Job of sending an Notification ${job.id} completed!`);
})


worker.on("failed", (job, err) => {
  console.log(`Job of sending an notification is ${job.id} failed:`, err.message);
});