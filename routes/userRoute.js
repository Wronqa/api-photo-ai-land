const router = require('express').Router();
const {
	registerUser,
	loginUser,
	checkUser,
} = require('../controllers/authController');
const {
	changePassword,
	editEmail,
	changeCoverPhoto,
	changeProfilePhoto,
	getUser,
	searchUser,
} = require('../controllers/userController');
const verify = require('../middleware/authMiddleware');

router.route('/user/password').post(verify, changePassword);
router.route('/user/email').put(verify, editEmail);
router.route('/user/update/cover').put(verify, changeCoverPhoto);
router.route('/user/update/profile').put(verify, changeProfilePhoto);
router.route('/user/profile/:username').get(verify, getUser);
router.route('/user/search/:username').get(verify, searchUser);

module.exports = router;
