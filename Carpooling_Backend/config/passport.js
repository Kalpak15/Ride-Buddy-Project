/* config/passport.js */

/* Dependencies */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserModel");  // Import your user model

/* Passport Middleware */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,  // Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Client secret
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (token, tokenSecret, profile, done) {
      try {
        console.log(profile);
        let user = await User.findOne({email: profile.emails[0].value});
        
        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          });

          user = await newUser.save();
          console.log("New user created:", user);
          console.log("New user id:", user.id);
        }
        
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* How to store the user information in the session */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});


/* How to retrieve the user from the session */
passport.deserializeUser(async  function (id, done) {  //it will put req.user=user in the req.
  const user = await User.findById(id);
  console.log("Deserialized user:", user);
  if(!user){
    done(null, false);
  }
  else{
    done(null, user);
  }
});

/* Exporting Passport Configuration */
module.exports = passport;
