const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: ["id", "username", "email", "password"],
        include: [
            {
                model: Post,
                as: "posts",
                attributes: ["id", "title", "body"],
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "post_id"],
            },
        ],
    })
    //include posts and comments of user
    .then((dbUserData) => {
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get user by id
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "username", "email", "password"],
        include: [
            {
                model: Post,
                as: "posts",
                attributes: ["id", "title", "body"],
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "post_id"],
            },
        ],
    })
    //include posts and comments of user
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//add user
router.post("/", (req, res) => {
    User.create({
        //expects username, email and password
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    .then((dbUserData) => {
        //save the data into a session
        req.session.save(() => {
            //run the save function
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

//log in user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then((dbUserData) => {
        //check if user present
        if (!dbUserData) {
            res.status(400).json({ message: "User not found"});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        //proceed based on results
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect Password!" });
            return;
        }
        //save things into session
        req.session.save(() => {
            //declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            //send response
            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);    
    });
});
//update user
router.put("/", (req, res) => {
    //TODO
    res.send(`update user`);
});
//update user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//logout user
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            //end session
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;