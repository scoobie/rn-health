import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister=new EventEmitter();
  model:any={};

  constructor(private accountService:AccountService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response=>{
      console.log(response);
      this.router.navigateByUrl('')
    },error=>{
      this.toastr.error(error.error)
    })
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
