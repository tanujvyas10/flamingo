// import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
// import { Observable } from 'rxjs';


// const BASEURL='http://localhost:3000/api/chatapp'
// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor(private http:HttpClient) { }

//   GetAllUsers(): Observable<any> {
//     return this.http.get(`${BASEURL}/users`);
//   }


// }

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }


GetUserById(id): Observable<any> {
  return this.http.get(`${BASEURL}/user/${id}`);
}

GetUserByName(username): Observable<any> {
  return this.http.get(`${BASEURL}/username/${username}`);
}

FollowUser(userFollowed):Observable<any>{
  return this.http.post(`${BASEURL}/follow-user`,{userFollowed})
}

UnFollowUser(userUnFollowed):Observable<any>{
  return this.http.post(`${BASEURL}/unfollow-user`,{userUnFollowed})
}
 
MarkNotification(id,deleteValue?):Observable<any>{//? states that deleteValue is optional can be received o not
  return this.http.post(`${BASEURL}/mark/${id}`,{id,deleteValue})
}

MarkAllAsRead(){
  return this.http.post(`${BASEURL}/mark-all`,{all:true})
 
}

}