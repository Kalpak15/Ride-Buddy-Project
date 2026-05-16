const express = require("express");
const carpool = require("./routes/carpool");
const profile = require("./routes/profile");
const auth = require("./routes/auth");
const path = require("path");
const reviews = require("./routes/reviews");
const paymentRoutes = require("./routes/carpool");
const notificationRoutes = require("./routes/notifications");
const communityRoutes = require("./routes/community");
const dbConnect = require("./config/database");
var session = require('express-session')
const passport = require('./config/passport');
const cors = require("cors");
const googleAuthRoutes = require("./routes/google-auth");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

/* OAuth Middleware */
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.session())
// const base");


// app.use(cors({
//     origin: 'http://localhost:5173', // frontend URL
//     credentials: true,
//     methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//     allowedHeaders: ['Content-Type','Authorization']
// }));

// // Preflight OPTIONS handler (very important for POST/PUT)
// app.options('*', cors({
  //     origin: 'http://localhost:5173',
  //     credentials: true,
  //     methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  //     allowedHeaders: ['Content-Type','Authorization']
  // }));
  
  // Webhook
app.use(cors());


const webhookRoutes = require("./routes/webhook")
app.use("/api/v1/webhook",express.raw({type: "application/json"}),webhookRoutes)



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/auth",googleAuthRoutes);

app.use("/api/v1", carpool);
app.use("/api/v1/profile", profile);
app.use("/api/v1/auth", auth);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/v1/reviews", reviews);




// Payment Routes
const payments = require("./routes/payment")
app.use("/api/v1/orders",payments)

app.use("/api/v1/payments", paymentRoutes);
// Default Route
app.get("/", (req, res) => {
  res.send(`<h1>HomePage</h1>`);
});





app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/community", communityRoutes);




// KYC Verification Routes
const kycRoutes = require("./routes/kyc")
app.use("/api/v1/kyc",kycRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'Carpooling Backend API is live', status: 'ok' });
});


app.listen(PORT, "0.0.0.0",() => {
  console.log(`App is running at PORT ${PORT}`);
});