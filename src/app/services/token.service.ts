import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieServices:CookieService) { }

SetToken(token){
  this.cookieServices.set('app_token',token)
}

GetToken(){
  return this.cookieServices.get("app_token")
}

DeleteToken(){
  this.cookieServices.delete("app_token")
} 

GetPayload(){
  const token=this.GetToken();
  let payload;
if(token){
  payload=token.split(".")[1];
  payload= JSON.parse(window.atob(payload));//atob is used to decode the base-64 encoded string

}
return payload.data;
}


}
