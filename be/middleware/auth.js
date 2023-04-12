const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ status: "false" });
  try {
    const decoder = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.wallet = decoder.wallet;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = verifyToken;
