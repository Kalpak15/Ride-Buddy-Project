// utils/nodemailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,  
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;