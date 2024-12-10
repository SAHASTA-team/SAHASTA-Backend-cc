const prisma = require('../models/prismaClient');

module.exports = {
    getProfile: async (req, res) => {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const user = await prisma.user.findUnique({
                where: { id: req.user.userId },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
