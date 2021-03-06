import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEDURL='http://localhost:3000/api/chatapp';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  registerUser(body):Observable<any>{
    return this.http.post(`${BASEDURL}/register`,body);
  }

  LoginUser(body):Observable<any>{
    return this.http.post(`${BASEDURL}/login`,body);
  }
}
