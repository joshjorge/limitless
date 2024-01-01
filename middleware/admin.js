const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function admin(req, res, next) {
  const token = req.cookies.jToken;
  if (!token) return res.redirect("/logIn");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;

    if (!req.user.isAdmin) return res.redirect("/logIn");
    next();
  } catch (error) {
    res.redirect("/logIn");
    console.log("admin error : ", error.message);
  }
};
