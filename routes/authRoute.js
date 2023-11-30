const router = require('express').Router();
const {
	registerUser,
	loginUser,
	logout,
	checkUser,
} = require('../controllers/authController');
const verify = require('../middleware/authMiddleware');

router.route('/auth/register').post(registerUser);
router.route('/auth/login').post(loginUser);
router.route('/auth/check').get(verify, checkUser);
router.route('/auth/logout').get(verify, logout);

module.exports = router;
