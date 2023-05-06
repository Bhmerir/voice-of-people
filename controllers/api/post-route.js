const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const {formatCurrentDate} = require('../../utils/helpers');

/*This route is responsible for creating a post, it takes title and content and 
it adds user_id and current date to them and then saves the post in database*/
router.post('/', withAuth, async (req,res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date_created: formatCurrentDate(),
            user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/*This route is responsible for updating a post, it takes the id of the post as req.params and the new title and content 
as req.body and then saves the changes in database*/
router.put('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
          where: {
            id: req.params.id
          }
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/*This route is responsible for deleting a post by taking its id as req.params*/
router.delete('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.destroy(
        {
          where: {
            id: req.params.id
          }
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;