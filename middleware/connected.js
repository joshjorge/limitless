const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function connected(req, res, next) {
  const token = req.cookies.jToken;
  if (token) return res.redirect("/");
  next();
};
