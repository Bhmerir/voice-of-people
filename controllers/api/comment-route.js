const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const {formatCurrentDate} = require('../../utils/helpers');

/*This route is responsible for creating a comment, it takes the comment as req.body and the id of the post as req.params
and it adds user_id and current date to them and then saves the post in database*/
router.post('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            post_id: req.params.id,
            date_created: formatCurrentDate(),
            user_id: req.session.user_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;