require('dotenv').config({path:'../.env'});
const  { Worker, Job } = require('bullmq');
const emailQueue = require('../Queues/emailQueue.js');
const transporter = require("../utils/nodemailer");

const IORedis = require('ioredis');

console.log(transporter)

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null
});


const worker = new Worker('emailQueue', async (job) => {

    // console.log(`Processing job of sending an Email to: ${job.data.to}`);   

     const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.html
     });

    //  console.log(respose)
      
    //  console.log(`Email sent to: ${job.data.to}`);

},{connection});


worker.on('completed',(job)=>{
    console.log(` Job of sending an Email${job.id} completed!`);
})


worker.on("failed", (job, err) => {
  console.log(`Job of sending an Email ${job.id} failed:`, err.message);
});