const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const querystring = require("querystring");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

/**
 * STEP 1 → Redirect to Google
 */
const googleAuth = (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    querystring.stringify({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

  res.redirect(url);
};

/**
 * STEP 2 → Callback
 */

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code → token
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      querystring.stringify({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenRes.data.access_token;

    // Get user info
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { email, given_name, family_name, picture, sub } = userRes.data;

    // 🔐 Check DB
    let user = await User.findOne({ email });

    let isNewUser = false;

    
    // 👉 LOGIN
    const accessJWT = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userPhoneNo: user.phoneNumber,
        name: user.firstName + " " + user.lastName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    // Redirect to frontend
    res.redirect(
      `http://localhost:5173/oauth-success?token=${accessJWT}&new=${isNewUser}`
    );
  } catch (error) {
    console.error("Google OAuth Error:", error.message);
    res.redirect("http://localhost:5173/oauth-failed");
  }
};


module.exports = { googleAuth, googleCallback };



