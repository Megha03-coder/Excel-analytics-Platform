const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info (like id) to request
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

module.exports = authMiddleware;
