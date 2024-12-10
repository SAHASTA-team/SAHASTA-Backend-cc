const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Memverifikasi token
        req.user = decoded; // Menetapkan payload token ke req.user
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

