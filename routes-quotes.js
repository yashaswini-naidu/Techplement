const express = require('express');
const router = express.Router();
const axios = require('axios');
const Quote = require('../models/quote');

// Get random quote
router.get('/random', async (req, res) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Get quotes by author
router.get('/author/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://zenquotes.io/api/quotes/${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
