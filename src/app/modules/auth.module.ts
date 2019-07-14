import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../components/auth/auth.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http'
@NgModule({            
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  exports:[
    AuthComponent,
    LoginComponent, 
    SignupComponent
      ],
      providers:[AuthService]
})
export class AuthModule { }
