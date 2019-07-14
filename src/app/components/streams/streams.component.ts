import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from "materialize-css"
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
token:any
streamsTab=false;
topStreamsTab=false;
  constructor(private tokenService:TokenService,private router:Router) { }

  ngOnInit() {
    this.streamsTab=true;
  this.token=this.tokenService.GetPayload();
  console.log("this token i s",this.token);
  const tabs=document.querySelector(".tabs")
  M.Tabs.init(tabs,{});
  }

  ChangeTabs(value){
console.log("ChangeTabs",value)
if(value==='streams'){
  this.streamsTab=true;
  this.topStreamsTab=false

  console.log("vakues",this.streamsTab,this.topStreamsTab)

}
 
if(value==='top'){
  this.streamsTab=false;
  this.topStreamsTab=true;

  console.log("vakues",this.streamsTab,this.topStreamsTab)

}
}

  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate([''])
  }

}
