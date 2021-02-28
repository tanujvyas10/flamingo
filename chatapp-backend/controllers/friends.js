const HttpStatus=require('http-status-codes')
const User=require("../models/userModels")


module.exports={

    FollowUser(req,res){
        const followUser=async()=>{
             await User.update(
             {
                 _id:req.user._id,
                 "following.userFollowed":{$ne:req.body.userFollowed}//make the check that following user not alerady contains the id of the user that he/she wants to follow
             },
            { 
             $push:{
                 following:{
                     userFollowed:req.body.userFollowed
                 }
                }   
             })


            await User.update(
                {
                  _id: req.body.userFollowed,
                  'following.follower': { $ne: req.user._id }
                },
                {
                  $push: {
                    followers: {
                      follower: req.user._id
                    },
                    notifications: {
                      senderId: req.user._id,
                      message: `${req.user.username} is now following you.`,
                      created: new Date(),
                      viewProfile: false
                    }
                  }
                }
              );

        }
        
        followUser()
        .then(()=>{
            res.status(HttpStatus.OK).json({message:'Following user now'})
        })
        .catch(err=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in followeing the user"})
        })
    }
  ,
  UnFollowUser(req, res) {
    const unFollowUser = async () => {
      await User.update(
        {
          _id: req.user._id
        },
        {
          $pull: {
            following: {
              userFollowed: req.body.userFollowed
            }
          }
        }
      );

      await User.update(
        {
          _id: req.body.userFollowed
        },
        {
          $pull: {
            followers: {
              follower: req.user._id
            }
          }
        }
      );
    };

    unFollowUser()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: 'Unfollowing user now' });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured' });
      });
  }  
,
async MarkNotification(req,res){
  console.log("in backend at Marknotication",req.body)
  console.log("in backend at Marknotication for req. user",req)
  

  if(!req.body.deleteValue){
    await User.updateOne({_id:req.user._id,//mongoDb syntax not the mongoose
      'notifications._id':req.params.id
    },{
      $set:{'notifications.$.read':true}
    })
    .then(()=>{
      res.status(HttpStatus.OK).json({message:'Marked as read'})
    })
    .catch(err=>{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Cannot get marked'})
    })
  }
  else{
   await User.updateOne({
     _id:req.user._id,
     'notifications._id':req.params.id
    },{
      $pull:{
        notifications:{_id:req.params.id}//condition of pulling the array
      }
    })
    .then(()=>{
      res.status(HttpStatus.OK).json({message:'Deleted the notification'})
    })
    .catch(err=>{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Cannot delelte notifyd'})
    }) 
  }
}  ,


async MarkAllNotifications(req,res){
  await User.update({
    _id:req.user._id
  },
  {
    $set:{'notifications.$[element].read':true}//to set the value for multiple read of all notifications
  },
  {arrayFilters:[{'element.read':false}],multi:true}//arrayfilters is a method in mongodb and it check for the reads that are false
  )
  .then(()=>{
    res.status(HttpStatus.OK).json({message:'Marked all notification'})
  })
  .catch(err=>{
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Cannot marked all notification'})
  }) 
}
  


        }
