const jwt = require("jsonwebtoken");
const secret_key = process.env.KEY_SECRET
module.exports.isAuthenticated = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
    if (err) {
      res.status(401).json({ msg: "You must authenticate to gain access", verified: false });
    } else {
      next();
    }
  });
}