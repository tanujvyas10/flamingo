const express =require("express")
const router=express.Router();


const MessageCtrl=require("../controllers/messages")

const AuthHelper=require("../Helpers/AuthHelper")
// router.post("/chat-messages/:senderId/:recieverId",AuthHelper.VerifyToken,MessageCtrl.SendMessage);

router.post(
    '/chat-messages/:sender_Id/:receiver_Id',
    AuthHelper.VerifyToken,
    MessageCtrl.SendMessage
  )

router.post(
  'receiver-messages/:sender/receiver',
  AuthHelper.VerifyToken,
  MessageCtrl.MarkReceiverMessages

)

  router.get(
    '/chat-messages/:sender_Id/:receiver_Id',
    AuthHelper.VerifyToken,
    MessageCtrl.GetAllMessages
  )

module.exports=router 