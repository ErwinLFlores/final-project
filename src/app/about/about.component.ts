import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLogged:boolean;

  constructor(
    private service: GlobalService,
    private route: Router,
    private titleService: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle('About Us');

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();
  }

}
