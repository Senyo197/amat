const jwt = require("jsonwebtoken");

const verifyMedicalToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.medicalPractitionerId = decoded.id;
    req.role = decoded.role;

    // Refresh token if it's nearing expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 86400) {
      const refreshedToken = jwt.sign(
        { id: decoded.id, name: decoded.name, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: 86400 }
      );
      res.setHeader("Authorization", `Bearer ${refreshedToken}`);
    }

    next();
  } catch (err) {
    console.error("Invalid token", err);
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = verifyMedicalToken;
