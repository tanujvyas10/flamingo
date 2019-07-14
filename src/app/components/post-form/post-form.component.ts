import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client'
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

 // socketHost:any;
  socket:any;
  postForm:FormGroup;

  constructor(private formGroup:FormBuilder,private postService:PostService) { 
   // this.socketHost='http://localhost:3000';
    this.socket=io('http://localhost:3000')

  }

  ngOnInit() {
  this.init();
  }


  init(){
    this.postForm=this.formGroup.group({
      post:['',Validators.required]
    })
  }

  submitPost(){
console.log(this.postForm.value)
this.postService.addPost(this.postForm.value).subscribe(data=>{
  console.log(data);
  this.socket.emit('refresh',{})//name could be anything here
  this.postForm.reset()
})


  }

}
