const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// --- Profile Routes ---
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteAccount);

module.exports = router;
