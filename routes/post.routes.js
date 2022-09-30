const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();
// const multerPost = require("../middleware/multer-config");
// const uploadController = require("../controllers/upload.controller");

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
// router.post("/", postController.createPost);
router.put("/:id", upload.single("file"), postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// uploadImg
// router.put("/upload/:id", upload.single("file"), uploadController.uploadPost);

// comments
// router.patch('/comment-post/:id', postController.commentPost);
// router.patch('/edit-comment-post/:id', postController.editCommentPost);
// router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;
