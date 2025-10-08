const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router - send all requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Production server running at http://localhost:${port}`);
    console.log('Test your routes:');
    console.log('- http://localhost:3000/');
    console.log('- http://localhost:3000/login');
    console.log('- http://localhost:3000/signup');
    console.log('- http://localhost:3000/leadManagement');
});