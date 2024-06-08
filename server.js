const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quotes = require('./routes/quotes');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/quotes', quotes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
