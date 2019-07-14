import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client'
import {CaretEvent,EmojiEvent} from 'ng2-emoji-picker'
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,AfterViewInit {

reciever:string
user:any;
message:any;
recieverData:any;
typingMessages;
typing=false;
messagesArray=[]
socket:any;



public eventMock;
public eventPosMock;

public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
public toggled = false;
public content = ' ';

private _lastCaretEvent: CaretEvent;


  constructor(private tokenService:TokenService,
    private msgService:MessageService,
    private route:ActivatedRoute,
    private usersService:UsersService) {
this.socket=io("http://localhost:3000")
   }

  ngOnInit() {
    this.user=this.tokenService.GetPayload();
    this.route.params.subscribe(params=>{
      console.log("params in ngonIt",params)
      this.reciever=params.name  
      this.GetUserByUsername(this.reciever)
    })


    this.socket.on("refreshPage",()=>{
      this.GetUserByUsername(this.reciever)

    })

    this.socket.on('is_typing',data=>{
      console.log("socket is tyoimg",data)
      if(data.sender==this.reciever)
      console.log("sender is typing",this.reciever)
      this.typing=true;
    })
  
  this.socket.on('has_stoped',data=>{
    if(data.sender===this.reciever){
      this.typing=false
    }
  })
  }


  ngAfterViewInit(){
    const params={
      room1:this.user.username,
      room2:this.reciever
    }
  this.socket.emit('join chat',params)
  }

GetUserByUsername(name){
this.usersService.GetUserByName(name).subscribe(data=>{
  console.log("getuserByUsername",data)
  this.recieverData=data.result;
  this.GetMessages(this.user._id,data.result._id)
})
}

  SendMessage(){
if(this.message){
  this.msgService.SendMessage(this.user._id,this.recieverData._id,this.recieverData.username,this.message).subscribe(data=>{
    console.log("sendMEssage ",data)
    this.socket.emit('refresh',{})
    this.message=''
    })
}
  
}


GetMessages(senderId, receiverId) {
  this.msgService.GetAllMessages(senderId, receiverId).subscribe(data => {
    console.log("Get messsges in messges component",data)
    this.messagesArray = data.messages.message;
  });
}



HandleSelection(event: EmojiEvent) {
  this.content = 
this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
  this.eventMock = JSON.stringify(event);
  console.log("HandleSeletion",this.content)
  this.message=this.content
  this.toggled=!this.toggled;
this.content=""
}

HandleCurrentCaret(event: CaretEvent) {
  this._lastCaretEvent = event;
  this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
}



IsTyping(){
console.log('Typing a message')
this.socket.emit('start_typing',{
  sender:this.user.username,
  receiver:this.reciever
})

if(this.typingMessages){
  clearTimeout(this.typingMessages)
}

this.typingMessages=setTimeout(()=>{
this.socket.emit('stop_typing',{
  sender:this.user.username,
  receiver:this.reciever
})
},500)
}


Toggled()
{
  this.toggled= !this.toggled;

}




}
