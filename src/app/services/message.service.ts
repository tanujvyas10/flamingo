import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASEURL='http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

SendMessage(senderId,recieverId,recieverName,message):Observable<any>
{
return this.http.post(`${BASEURL}/chat-messages/${senderId}/${recieverId}`,{
recieverId,recieverName,message
});
}


GetAllMessages(senderId,recieverId):Observable<any>
{
return this.http.get(`${BASEURL}/chat-messages/${senderId}/${recieverId}`);
}

MarkMessages(sender,reciever):Observable<any>
{
return this.http.get(`${BASEURL}/receiver-messages/${sender}/${reciever}`);
}

}
