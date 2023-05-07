const router = require("express").Router();
const { User } = require("../../models");

//This route is responsible for logging in and it checks if password is correct or no
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({where: { user_name: req.body.user_name }});
        if (!userData) {
            res.status(404).json({ message: "Incorrect User Name!" });
            return;
        }

        const validPassword = userData.checkPassord(req.body.password);
        if (!validPassword) {
            res.status(404).json({ message: "Incorrect Password!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//This route is responsible for signing up 
router.post("/signup", async (req, res) => {
    try {
        /*This part checks if the user name is taken before or not. 
        If it's taken, it doesn't let user sign up withis user name*/
        const userCheckData = await User.findOne({where: { user_name: req.body.user_name }});
        if (userCheckData) {
            res.status(404).json({ message: "This user name is taken. Please choose another one!" });
            return;
        }
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: "You are now logged in!" });
        });
      } catch (err) {
        res.status(400).json(err);
      }
});

//This post is responsible for logging out
router.post('/logout', (req, res) => {
    console.log(req.session.logged_in);
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
