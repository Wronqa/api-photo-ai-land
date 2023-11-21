const router = require('express').Router();
const { generateArticle } = require('../controllers/aiController');
const verify = require('../middleware/authMiddleware');

router.route('/ai').post(verify, generateArticle);

module.exports = router;
