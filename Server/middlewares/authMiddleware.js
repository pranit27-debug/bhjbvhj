const jwt = require('jsonwebtoken');
const User = require('../Auth/auth.model');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId).select('tokenVersion');
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (typeof decoded.tokenVersion === 'number' && user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    req.user = { id: decoded.userId, userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
