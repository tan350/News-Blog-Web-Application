const express = require('express');
const cors = require('cors'); // Import the cors middleware
const axios = require('axios');  

const app = express();
const port = 3000;

app.use(cors()); // Use the cors middleware

// Define a new route for the new API request
app.get('/query', async (req, res) => {
    try {
        const { search } = req.query;
        const apiKey = "720cd34b29a24f30bf8c8d7fd12f782c"; // Replace with your actual News API key
        const apiUrl = `https://newsapi.org/v2/everything?q=${search}&pageSize=10&apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching data from another API", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get('/news', async (req, res) => {
    try {
        const apiKey = "720cd34b29a24f30bf8c8d7fd12f782c"; // Replace with your actual News API key
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
