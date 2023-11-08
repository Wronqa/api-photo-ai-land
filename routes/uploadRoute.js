const { uploadPhotos } = require('../controllers/uploadController');
const verify = require('../middleware/authMiddleware');

const router = require('express').Router();

router.route('/').post(verify, uploadPhotos);

module.exports = router;
