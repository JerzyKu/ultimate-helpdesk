const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized.1" });
  }

  const token = authHeader.split(" ")[1];
  // console.log('token', token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    req.user = decoded.username;
    req.roles = decoded.roles;
    next()
  });
};

module.exports = verifyJWT;
