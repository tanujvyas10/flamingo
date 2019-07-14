import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  errorMessage:string;
  showSpinner:boolean=false;


  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router,private tokenService:TokenService) { }

  ngOnInit() { 
    this.init();
  }

  init(){
    this.signupForm=this.formBuilder.group({
      username:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    });//now the error messages will be displayed automatically

  }




  signupUser(){
    this.showSpinner=true;
    console.log(this.signupForm.value)
    this.authService.registerUser(this.signupForm.value).subscribe(data=>{
      this.tokenService.SetToken(data.token)
      console.log(data);
this.signupForm.reset();
setTimeout(()=>{
  this.router.navigate(['streams'])

},2000);
    },err=> 
    {
      this.showSpinner=false;
      console.log(err)
      if(err.error.msg){
        this.errorMessage=err.error.msg[0].message;
//alert(this.errorMessage)
      }


      if(err.error.message){
        this.errorMessage=err.error.message;
  //      alert(this.errorMessage)
      }
    })
  }

}
