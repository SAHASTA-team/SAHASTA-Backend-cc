const prisma = require('../models/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Validasi input
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Name, email, and password are required" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan pengguna ke database
            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword },
            });

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
