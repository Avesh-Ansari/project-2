require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authenticateUser = async (req, res, next) => {
    console.log('Request Headers:',req.headers);
    console.log('Middleware Executed')
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    console.log('token:',token);
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    console.log('decoded token:',decoded);
    req.user = await User.findById(decoded.userId);
    console.log('User:',req.user)
    next();
  } catch (error) {
    console.error('JWT verification error',error)
    res.status(401).json({ message: 'Invalid token' });
  }
};