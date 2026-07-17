const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so the React app can access this API
app.use(cors());
app.use(express.json());

// Simple API Endpoint
app.get('/api/message', (req, res) => {
    res.json({ 
        text: "Hello from the Node.js backend!", 
        timestamp: new Date().toLocaleTimeString() 
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
