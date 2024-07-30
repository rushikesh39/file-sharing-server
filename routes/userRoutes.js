const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/register').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
