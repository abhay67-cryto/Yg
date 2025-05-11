const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/game', require('./routes/game'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
￼Enter
