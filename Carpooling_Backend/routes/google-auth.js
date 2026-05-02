
/* Dependencies */
const router = require("express").Router();
const passport = require("../config/passport");

/* Route to start OAuth2 authentication */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/* Callback route for OAuth2 authentication */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  function (req, res) {
    
    console.log(req.user);
    console.log(req.session)
    console.log(req.user.id)
    req.session.save(() => {

      res.redirect(`http://localhost:5173/profile/${req.user.id}`);  // Edit for correct redirect link
    });
  }
);

/* EXPORTS */
module.exports = router;