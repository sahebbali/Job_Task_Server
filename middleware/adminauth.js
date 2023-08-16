
const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
      if (decoded.role !== 'admin') {
        return res.status(401).json({ message: 'You are not an admin' });
      }
  
      // If the user is an admin, grant access
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  };
module.exports = adminMiddleware;