const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

//This route shows all the posts of all users
router.get('/', async(req, res) =>{
    try {
        const postData = await Post.findAll({
            include: [{ 
                model: User,
                attributes: ['user_name']
            }],
            
            order: [['date_created', 'DESC']],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
      console.log(req.session.logged_in);
        res.render('homepage', {
          posts,
          logged_in: req.session.logged_in,
        });
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
    //    res.status(200).json(posts)
        res.render('dashboard', {
          posts,
          logged_in: req.session.logged_in,
        });
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

//This route shows all comments of a specific post 
router.get("/api/comments/:id", withAuth, async(req, res) =>{
    try {
        const commentData = await Comment.findAll({
            include: [{ 
                    model: User,
                    attributes: ['user_name']
                },
                { 
                    model: Post
                }
            ],
            where: { post_id: req.params.id},
            order: [['date_created', 'DESC']],
        });
        console.log(commentData)
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.status(200).json(comments)
   /*     res.render('homepage', {
          comments,
          logged_in: req.session.logged_in,
        });*/
    } catch (err) {
        res.status(500).json(err);
    }
});

//This route renders users page for login
router.get("/api/users/login", async(req, res) =>{
    try {  
        //if login is true, login page is shown else signup page is shown
        let login = {"login": true} ; 
        res.render('login', login);
    } catch (err) {
        res.status(500).json(err);
    }
});

//This route renders users page for login
router.get("/api/users/signup", async(req, res) =>{
    try {
        let login = {"login": false} ;
        res.render('login', login);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;