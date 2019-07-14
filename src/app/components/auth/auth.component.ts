import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const tabs=document.querySelector(".tabs");

    M.Tabs.init(tabs,{})//{could be -: duration:400(in ms)
  
  }

}
