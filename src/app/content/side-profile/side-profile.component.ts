import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.css']
})
export class SideProfileComponent implements OnInit {

  isLogged:boolean;

  isProfile: any;
  profileImg: any;
  full_name: any;
  email: any;
  job_title: any;
  mobile_number: any;

  constructor(private service: GlobalService, private route: Router) {
    this.isLogged = false;
   }

  ngOnInit(): void {

    if(this.service.getToken() !== ''){
      this.service.httpGetProfile();
    }

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

    this.service.checkLogStatus();


    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.profileImg = profile.meta.photo_url;
        this.full_name = profile.meta.first_name+' '+profile.meta.last_name;
        this.email = profile.email;
        this.job_title = profile.meta.job_title;
        this.mobile_number = profile.meta.mobile_number;
      }
    );
  }

}
