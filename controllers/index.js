const router = require("express").Router();
const homeRoutes = require("./home-routes");
const userRoutes = require("./api/user-routes");
const commentRoutes = require("./api/user-routes");
const postRoutes = require("./api/post-routes");
//setup route usage
router.use("/", homeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);

module.exports = router;