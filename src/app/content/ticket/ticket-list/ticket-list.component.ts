import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  isLogged:boolean;
  ticketList: any;
  totalTicket: any;

  constructor(private service: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.service.httpGetTicket();

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();

     this.service.onHttpGetTicket.subscribe(
      (ticket: any) => {
        this.ticketList = ticket.data;
        this.totalTicket = ticket.total;
      }
    );
  }

}
