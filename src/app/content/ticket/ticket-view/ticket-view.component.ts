import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Params  } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit, OnDestroy {

  isLogged: any;
  ticketList: any;
  selectedTicket: any;

  constructor(
    private router: ActivatedRoute,
    private service: GlobalService
  ) { }

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

        this.router.params.subscribe(
          (params: Params) => {
            const id = params.id;
            const selected = this.ticketList.filter(
              (response: any) => {
                // return +response.template_id === +id;
                return response.id === id;
              }
            );

            if(selected.length > 0){
              this.selectedTicket = selected[0];
              this.service.subjectTicket.next(this.selectedTicket.id);
            }
          }
        );
      }
    );
  }

  ngOnDestroy(): void{
    this.service.subjectTicket.next('');
  }

}
