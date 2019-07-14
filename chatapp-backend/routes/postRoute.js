const express=require("express");
const router=express.Router();

const AuthHelper=require("../Helpers/AuthHelper")

const PostCtrl=require("../controllers/posts")

router.get("/posts",AuthHelper.VerifyToken,PostCtrl.GetAllPosts)
//router.get("/post/:id",AuthHelper.VerifyToken,PostCtrl.GetPost)
router.get('/post/:id', AuthHelper.VerifyToken, PostCtrl.GetPost);


router.post('/post/add-post',AuthHelper.VerifyToken,PostCtrl.AddPost)
 router.post("/post/add-like",AuthHelper.VerifyToken,PostCtrl.AddLike);
 router.post("/post/add-comment",AuthHelper.VerifyToken,PostCtrl.AddComment);
module.exports=router
