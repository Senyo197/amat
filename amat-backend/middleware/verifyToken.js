const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const now = Date.now();
    const twentyMinutes = 20 * 60 * 1000;

    // Check if the token has expired due to inactivity
    if (now - decoded.lastActivity > twentyMinutes) {
      return res
        .status(401)
        .json({ error: "Session timed out, please log in again" });
    }

    // Refresh `lastActivity` and re-sign the token
    const refreshedToken = jwt.sign(
      { id: decoded.id, name: decoded.name, lastActivity: now },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // 24 hours
    );

    // Set the refreshed token in the response header
    res.setHeader("Authorization", `Bearer ${refreshedToken}`);

    // Add user information to the request object
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(500).json({ error: "Failed to authenticate token" });
  }
};

module.exports = verifyToken;
