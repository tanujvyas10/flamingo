import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';

const routes:Routes=[
  {
path:'streams',
component:StreamsComponent,
canActivate:[AuthGuard]//check if the token is valid or token or token is available
  },
  {
    path:"post/:id",
    component:CommentsComponent,
    canActivate:[AuthGuard]

  },
  {
    path:"people",
    component:PeopleComponent,
    canActivate:[AuthGuard]
  }

  ,{
    path:"notifications",
    component:NotificationsComponent,
    canActivate:[AuthGuard]
  },{
    path:'chat/:name',
    component:ChatComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class StreamsRoutingModule { }
