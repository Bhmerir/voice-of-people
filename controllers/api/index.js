const router = require('express').Router;

const userRoutes = require('./user-route.js');
const postRoutes = require('./post-route.js');
const commentRoutes = require('./comment-route.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;