const multer = require('multer');

// Set up multer to store files in memory
const storage = multer.memoryStorage(); // Store files in memory, not on disk

// Create multer instance
const upload = multer({ storage });

module.exports = upload;