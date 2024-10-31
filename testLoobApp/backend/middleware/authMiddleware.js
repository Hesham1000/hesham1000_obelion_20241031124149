const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // Import the Users model

// Middleware to authenticate users using JSON Web Tokens
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, 'yourSecretKey', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    try {
      // Verify the user exists in the database
      const user = await Users.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // If token is valid, save the decoded user info in request for use in other routes
      req.user = decoded;
      next();
    } catch (dbError) {
      return res.status(500).json({ message: 'Database error.' });
    }
  });
}

module.exports = authMiddleware;