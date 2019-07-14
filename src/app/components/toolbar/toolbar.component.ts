import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
// import * as M from 'materialize-css'
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment'
import io from'socket.io-client'
import _ from 'lodash'
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
user:any;
notifications=[];
socket:any;
count=[];
chatList=[];
msgNumber=0

  constructor(private tokenService:TokenService,private router:Router,private usersService:UsersService,private msgService:MessageService) { 
    this.socket=io("http://localhost:3000")
  }

  ngOnInit() {
    this.user=this.tokenService.GetPayload();

  const dropDownElement = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropDownElement, {
    alignment: 'right',
    hover: true,
    coverTrigger: false
  });

  const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
  M.Dropdown.init(dropDownElementTwo, {
    alignment: 'right',
    hover: true,
    coverTrigger: false
  });


  this.GetUser();
  this.socket.on("refreshPage",()=>{
    this.GetUser();

  })




  }


GetUser(){
  this.usersService.GetUserById(this.user._id).subscribe(data=>{
    console.log("get user on toolbar",data)
    this.notifications=data.result.notifications.reverse();
    const value=_.filter(this.notifications,['read',false]);
    console.log("Value in getuser()",value)
  this.count=value
this.chatList=data.result.chatList;

console.log("getUser chatlist in toolbar ",this.chatList)

this.CheckIfread(this.chatList)
console.log("Message number",this.msgNumber)



  },err=>{
  if(err.error.token===null)
  {
    this.tokenService.DeleteToken();
    this.router.navigate([""])
  }
  })
}

  GoToHome(){
    this.router.navigate(['streams'])
  }

  GoToChatPage(name){
this.router.navigate(['chat',name])
this.msgService.MarkMessages(this.user.username,name).subscribe(data=>{
  console.log("reply to gotochatPage",data)
})
  }


  MarkAll(){
    this.usersService.MarkAllAsRead().subscribe(data=>{
      console.log("mark all on toolbar",data)
    })
    this.socket.emit("refresh",{})
  }

  
  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate([''])
  }

  

 TimeFromNow(time){  
  return moment(time).fromNow();

}

MessageDate(data){
  return moment(data).calendar(null, {
    sameDay:'[Today]',
    lastDay:'[Yesterday]',
    lastWeek:'DD/MM/YYYY',
    sameElse:'DD/MM/YYYY'
  })
}


CheckIfread(arr){
  console.log("arr in checkIfread",arr)

  const checkArr=[]
for(let i=0;i<arr.length;i++){
  const receiver=arr[i].msgId.message[arr[i].msgId.message.length - 1]//get last value of each message array
if(this.router.url!==`/char/${receiver.sendername}`){
 if(receiver.isRead === false&& receiver.receivername===this.user.username){
   checkArr.push(1);
   this.msgNumber=_.sum(checkArr);
 }

}
}  
  console.log("arr in msgNO btoom",this.msgNumber)

}

}
