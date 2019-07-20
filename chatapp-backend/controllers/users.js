const User=require("../models/userModels")

const httpStatus=require("http-status-codes")
module.exports={

  // async GetAllUsers(req,res){
  //    await User.find({})
  //    .populate('posts.postId')
  //    .populate('following.userFollowed')
  //     .populate('followers.follower')
  //     .populate("chatList. receiverId")
  //     .populate("chatList. msgId")
  //    .then((result)=>{
  //        res.status(httpStatus.OK).json({message:'All users',result})
  //    })        
  //    .catch(err=>{
  //      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:'Users not found'})  
  //    })
  //   },
  async GetAllUsers(req, res) {
    await User.find({})
      .populate('posts.postId')
      // .populate('following.userFollowed')
      // .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .then(result => {
        res.status(httpStatus.OK).json({ message: 'All users', result });
      })
      .catch(err => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured' });
      });
  },
    // async GetUser(req,res){
    //   await User.findOne({_id:req.params.id})
    //   .populate('posts.postId')
    //   .populate('following.userFollowed')
    //   .populate('followers.follower')
    //   .populate("chatList. receiverId")
    //   .populate("chatList. msgId")

    //   .then((result)=>{
    //       res.status(httpStatus.OK).json({message:'User By Id',result})
    //   })        
    //   .catch(err=>{
    //     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:'Users not found'})  
    //   })
    //  }
    async GetUser(req, res) {
      await User.findOne({ _id: req.params.id })
        .populate('posts.postId')
        // .populate('following.userFollowed')
        // .populate('followers.follower')
        .populate('chatList.receiverId')
        .populate('chatList.msgId')
        .then(result => {
          res.status(httpStatus.OK).json({ message: 'User by id', result });
        })
        .catch(err => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error occured' });
        });
    }
    ,
     
    //  async GetUserByName(req,res){
    //    await User.findOne({username:req.params.username})
    //    .populate('posts.postId')
    //    .populate('following.userFollowed')
    //    .populate('followers.follower')
    //    .then((result)=>{
    //        res.status(httpStatus.OK).json({message:'User By Username',result})
    //    })        
    //    .catch(err=>{
    //      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:'Users not found'})  
    //    })
    //   }

    
  async GetUserByName(req, res) {
    await User.findOne({ username: req.params.username })
      .populate('posts.postId')
      // .populate('following.userFollowed')
      // .populate('followers.follower')
      .then(result => {
        res.status(httpStatus.OK).json({ message: 'User by username', result });
      })
      .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
      });
  }
}