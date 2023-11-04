const router = require('express').Router();
const {
	addPost,
	timeline,
	like,
	comment,
	remove,
	userPosts,
} = require('../controllers/postController');
const verify = require('../middleware/authMiddleware');

router.route('/post').post(verify, addPost);
router.route('/post').get(verify, timeline);
router.route('/post/like/:id').put(verify, like);
router.route('/post/comment/:id').put(verify, comment);
router.route('/post/:id').delete(verify, remove);
router.route('/post/:username').get(verify, userPosts);

module.exports = router;
