const router = require('express').Router();
const { registerUser } = require('../controllers/authController');

router.route('/auth/register').post(registerUser);

module.exports = router;
