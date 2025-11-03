const express = require('express');
const router = express.Router();
const port = 8000

// Import routes
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const presensiRoute = require('./routes/presensi.route');

// Middleware to parse JSON requests
router.use(express.json());

// Use routes
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/presensi', presensiRoute);

// Start the server
router.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = router;
