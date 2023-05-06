const router = require("express").Router();
const { User } = require("../../models");

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

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
