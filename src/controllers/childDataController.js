const prisma = require('../models/prismaClient');

module.exports = {
    addOrUpdateChild: async (req, res) => {
        try {
            const { 
                id, 
                name, 
                birthDate, 
                gender, 
                height, 
                weight 
            } = req.body;

            if (!req.user || !req.user.userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const formattedBirthDate = new Date(birthDate);

            const bmi = (weight / (height * height)).toFixed(2);
            const child = id
                ? await prisma.child.update({
                    where: { id },
                    data: { 
                        name, 
                        birthDate: formattedBirthDate, 
                        gender, 
                        height, 
                        weight, 
                        bmi }
                })
                : await prisma.child.create({
                    data: {
                        name,
                        birthDate: formattedBirthDate,
                        gender,
                        height,
                        weight,
                        bmi,
                        userId: req.user.userId
                    }
                });

            res.status(201).json(child);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
