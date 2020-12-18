import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  isLogged:boolean;

  constructor(private service: GlobalService,  private titleService: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Ticket');

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();
  }

}
