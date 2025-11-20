const jwt = require('jsonwebtoken');

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).send('No token provided');
    const token = header.split(' ')[1] || header;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).send('Invalid token');
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).send('Access denied');
      }
      req.user = decoded;
      next();
    });
  };
}

module.exports = auth;
