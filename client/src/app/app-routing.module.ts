import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MemberListComponent} from "./members/member-list/member-list.component";
import {MemberDetailComponent} from "./members/member-detail/member-detail.component";
import {ListsComponent} from "./lists/lists.component";
import {MessagesComponent} from "./messages/messages.component";
import {AuthGuard} from "./_guards/auth.guard";
import {TestErrorsComponent} from "./errors/test-errors/test-errors.component";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {ServerErrorComponent} from "./errors/server-error/server-error.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path:'',
    runGuardsAndResolvers:'always',
    //  canActivate:[AuthGuard],
    canActivate:[],
    children:[
      {path:'members',component:MemberListComponent},
      {path:'members/:id',component:MemberDetailComponent},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
    ]
  },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
