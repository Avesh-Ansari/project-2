// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
