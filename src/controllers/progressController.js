const prisma = require('../models/prismaClient');
const { categorizeBMI } = require('../utils/bmi');

module.exports = {
  addProgress: async (req, res) => {
    try {
        const { 
            childId, 
            height, 
            weight, 
            date 
        } = req.body;
        // Untuk Validasi childId
        const child = await prisma.child.findUnique({ where: { id: childId } });
        if (!child) {
            return res.status(400).json({ error: 'Invalid childId. Child does not exist.' });
        }

        const bmiValue = (weight / (height * height)).toFixed(2); // Hitung BMI
            const bmiCategory = categorizeBMI(bmiValue);
        const progress = await prisma.childProgress.create({
            data: { 
                childId, 
                height, 
                weight, 
                bmi: bmiCategory, 
                date: new Date(date) 
            },
        });

        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

    getProgressHistory: async (req, res) => {
      try {
          const { childId } = req.params;
          const history = await prisma.childProgress.findMany({
              where: { childId },
              orderBy: { date: 'desc' },
          });
          res.status(200).json(history);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  },
  
};


