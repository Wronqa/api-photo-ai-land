const router = require('express').Router();
const { addPost } = require('../controllers/postController');
const verify = require('../middleware/authMiddleware');

router.route('/post').post(verify, addPost);

module.exports = router;
