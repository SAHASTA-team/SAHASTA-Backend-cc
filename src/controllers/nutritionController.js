const prisma = require('../models/prismaClient');
const tensorflowPredict = require('../utils/tensorflowPredict');

module.exports = {
    scan: async (req, res) => {
        try {
            const { tensorflowPredict } = req.body;
            const nutrients = await tensorflowPredict(process.env.TF_MODEL_PATH);
            const scan = await prisma.nutritionScan.create({
                data: { userId: req.user.id, nutrients },
            });
            res.status(201).json(scan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
