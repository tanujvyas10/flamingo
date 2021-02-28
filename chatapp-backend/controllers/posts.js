const Joi=require("Joi")
const Post=require("../models/postModels");
const HttpStatus=require("http-status-codes")

const User=require("../models/userModels")

module.exports={
    AddPost(req,res){
        const schema=Joi.object().keys({
            post:Joi.string().required()
          
        });
        
        const {error}=Joi.validate(req.body,schema);

        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        
        }

        const body={
            user:req.user._id,
            username:req.user.username,
            post:req.body.post,
            created:new Date()

          
        }
        console.log("THE DATA AIA",body)

        Post.create(body)
        .then(async (post)=>{
         await User.update({
             _id:req.user._id
         },{
            $push:{posts:{
                postId:post._id,
                post:req.body.post,
                created:new Date() 
            }} 
         })
            res.status(HttpStatus.OK).json({message:"Post created",post})
        })
        .catch(err=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error Occured"})
            
        })
    },

  async GetAllPosts(req,res){
      try{
const posts=await Post.find({}).
populate('user')
.sort({created:-1});

const top=await Post.find({totalLikes:{$gte:2}})//in mongo db gte=greter than and equal to
.populate('user')
.sort({created:-1});

return res.status(HttpStatus.OK).json({message:"All posts",posts,top})
      }
      catch(err){
return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error occured!"})
      }
    },

    async AddLike(req, res) {
        const postId = req.body._id;
        await Post.update(
          {
            _id: postId,
            'likes.username': { $ne: req.user.username }//ne=not equal it checks if the username is different only then it allows to increment  so now each user can like only one time to one posts
          },
          {
            $push: {
              likes: {
                username: req.user.username
              }
            },
            $inc: { totalLikes: 1 }
          }
        )
          .then(() => {
            res.status(HttpStatus.OK).json({ message: 'You liked the post' });
          })
          .catch(err =>
        {
            alert("ERROR")
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })}
          
              );
      },
     

      async AddComment(req, res) {
     //  console.log(req.body)

        const postId = req.body.postId;
        await Post.update(
          {
            _id: postId,
          },
          {
            $push: {
              comments: {
                userId:req.user._id,
                username:req.user.username,
                comment: req.body.comment,
                createdAt:new Date()
              }
            },
           
          }
        )
          .then(() => {
            res.status(HttpStatus.OK).json({ message: 'You commented on a post' });
          })
          .catch(err =>
        {
            alert("ERROR")
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })}
          
              );
       },

      async GetPost(req, res) {
        await Post.findOne({ _id: req.params.id })
          .populate('user')
          .populate('comments.userId')
          .then(post => {
            console.log("REached at the post.js")
            res.status(HttpStatus.OK).json({ message: 'Post found', post });
          })
          .catch(err =>
            res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Post not found', post })
          );
      }
}
