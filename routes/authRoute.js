const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.route('/auth/register').post(registerUser);
router.route('/auth/login').post(loginUser);

module.exports = router;
