import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alias: any;
  isLogged:boolean;

  constructor(
    private service: GlobalService,
    private titleService: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Home');

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
        this.alias = profile.alias;
      }
    );
  }

}
