const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

function signToken(admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });
}

function protect(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
}

module.exports = { signToken, protect, JWT_SECRET };
