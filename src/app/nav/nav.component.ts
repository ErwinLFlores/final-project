import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged:boolean;

  constructor(private service: GlobalService, private route: Router) {
    this.isLogged = false;
  }
  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();
  }

  onLogout(){
    this.service.deleteToken();
    this.alertSuccess("Logged Out Successfully!");
    this.route.navigate(['/login']);
  }

  alertSuccess(message:string){
    swal.fire({
      icon: 'success',
      title: message,
    })
  }

}
