import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error:any;

  constructor(private router:Router,private location:Location) {
    const navigation=this.router.getCurrentNavigation();
    this.error=navigation?.extras?.state?.error;
  }


  ngOnInit(): void {
  }

  backClicked(){
    this.location.back();
  }

}
