const router = require('express').Router();
const {
	registerUser,
	loginUser,
	checkUser,
} = require('../controllers/authController');
const verify = require('../middleware/authMiddleware');

router.route('/auth/register').post(registerUser);
router.route('/auth/login').post(loginUser);
router.route('/auth/check').get(verify, checkUser);

module.exports = router;
