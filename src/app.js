const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const childDataRoutes = require('./routes/childDataRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/progress', progressRoutes);
app.use('/child-data', childDataRoutes);
app.use('/profile', profileRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to Sahasta API!');
  });

module.exports = app;