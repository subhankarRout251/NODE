const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.statues(401).json({ eror: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.statues(401).json({ error: "Invalid token" });
  }
};
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};
module.exports = { jwtAuthMiddleware, generateToken };
