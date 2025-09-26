const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from the root directory
app.use(express.static('.'));

// Serve HTML files with correct content type
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Html', 'Home.html'));
});

// Handle other HTML routes
app.get('/:page', (req, res) => {
  const page = req.params.page;
  // Security check to prevent directory traversal
  if (page.includes('..') || page.includes('/')) {
    return res.status(400).send('Invalid page');
  }
  
  // Try to serve the requested HTML file
  res.sendFile(path.join(__dirname, 'Html', page), (err) => {
    if (err) {
      // If file not found, serve the home page
      res.sendFile(path.join(__dirname, 'Html', 'Home.html'));
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server startup errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error(err);
  }
});