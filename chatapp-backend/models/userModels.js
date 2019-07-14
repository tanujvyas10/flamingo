const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    posts:[
        {
            postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
        post:{type:String},
        created:{type:Date,default:Date.now()}
        }
      ],
  
  notifications: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String },
      viewProfile: { type: Boolean, default: false },
      created: { type: Date, default: Date.now() },
      read: { type: Boolean, default: false },
      date: { type: String, default: '' }
    }
  ],
  chatList:[
    {
      // recieverId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      // msgId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      msgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
    }
  ]
})

module.exports=mongoose.model("User",userSchema)

