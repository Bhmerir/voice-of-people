const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

//This route shows all the posts of all users
router.get('/', async(req, res) =>{
    try {
        const postData = await Post.findAll({
            attributes: ['title', 'content', 'date_created'],
            include: [{ 
                model: User,
                attributes: ['user_name']
            }],
            
            order: [['date_created', 'DESC']],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts)
   /*     res.render('homepage', {
          posts,
          logged_in: req.session.logged_in,
        });*/
      } catch (err) {
        res.status(500).json(err);
      }
});

//This route shows all posts of a specific user (while clicking dashboard)
router.get('/dashboard', withAuth, async(req, res) =>{
    try {
        const postData = await Post.findAll({
            include: [{ 
                model: User,
                attributes: ['user_name']
            }],
            where: { user_id: req.session.user_id},
            order: [['date_created', 'DESC']],
        });
        console.log(postData)
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts)
   /*     res.render('homepage', {
          posts,
          logged_in: req.session.logged_in,
        });*/
      } catch (err) {
        res.status(500).json(err);
      }
});

//This route shows a specific post of a specific user 
router.get("/api/posts/:id", withAuth, async(req, res) =>{
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ 
                model: User,
                attributes: ['user_name']
            }],
            order: [['date_created', 'DESC']],
        });
        console.log(postData)
        res.status(200).json(postData)
   /*     res.render('homepage', {
          postData,
          logged_in: req.session.logged_in,
        });*/
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;