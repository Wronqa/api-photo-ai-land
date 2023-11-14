const router = require('express').Router();
const {
	registerUser,
	loginUser,
	checkUser,
} = require('../controllers/authController');
const { changePassword, editEmail } = require('../controllers/userController');
const verify = require('../middleware/authMiddleware');

router.route('/user/password').post(verify, changePassword);
router.route('/user/email').put(verify, editEmail);

module.exports = router;
