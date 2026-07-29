const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so the React app can access this API
app.use(cors());
app.use(express.json());

// 💡 1. REQUEST LOGGER MIDDLEWARE (Sends logs to stdout -> Loki)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[HTTP] ${new Date().toISOString()} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms | IP: ${req.ip}`);
    });
    next();
});

// Simple API Endpoint
app.get('/api/message', (req, res) => {
    res.json({ 
        text: "Hello from the Node.js backend!", 
        timestamp: new Date().toLocaleTimeString() 
    });
});

// 💡 2. TEST ERROR ROUTE (To test error streaming in Grafana)
app.get('/api/error-test', (req, res, next) => {
    const err = new Error("Database query failed!");
    next(err);
});

// 💡 3. ERROR HANDLING MIDDLEWARE (Sends errors to stderr -> Loki)
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()} | Path: ${req.originalUrl} | Message: ${err.message}`);
    res.status(500).json({ status: "error", message: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
