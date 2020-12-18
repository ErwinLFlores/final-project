import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged:boolean;

  constructor(private service: GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );
  }

}
