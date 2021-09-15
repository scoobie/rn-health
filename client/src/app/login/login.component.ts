import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show:boolean=true;
  model:any={};

  constructor(public accountService: AccountService,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response=>{
      this.router.navigateByUrl('/members')
    })
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
