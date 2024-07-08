const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      message: "Authentication failed",
      dataFound: false,
      status: false,
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403).json({
        message: "Authentication failed",
        dataFound: false,
        status: false,
      });
    req.user = user;
    next();
  }); 
};