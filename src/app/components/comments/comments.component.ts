import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client'
import * as moment from 'moment';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,AfterViewInit{

toolbarElement:any;
commentForm:FormGroup;
postId:any;
socket:any;
post:string;

//post: string;

commentsArray=[]

  constructor(private formBuilder:FormBuilder,private postService:PostService,private route:ActivatedRoute) {
    this.socket=io("http://localhost:3000");
   }

  ngOnInit() {
  this.toolbarElement=document.querySelector(".nav-content")
  this.postId=this.route.snapshot.paramMap.get('id')//we are getting the id that is mentin at the top url when we reached to the comment section 
  this.init()
  this.GetPost(); 
  this.socket.on("refreshPage",data=>{
    this.GetPost();//this is going to reload
  })
  }

init(){
this.commentForm=this.formBuilder.group({
  comment:['',Validators.required]
})
}

  ngAfterViewInit() {
 this.toolbarElement.style.display="none"
;  }
  

AddComment(){
console.log(this.commentForm.value)  
this.postService.addComment(this.postId,this.commentForm.value.comment).subscribe(data=>{
console.log(data)
this.socket.emit('refresh',{});
this.commentForm.reset();
})

}



GetPost() {
  this.postService.getPost(this.postId).subscribe(data => {
    console.log(data);
    this.post = data.post.post;
    this.commentsArray = data.post.comments.reverse();
  });
}


TimeFromNow(time){
  return moment(time).fromNow();

}
}
