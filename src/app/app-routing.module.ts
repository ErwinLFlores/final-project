import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './content/profile/profile.component';
import { TicketComponent } from './content/ticket/ticket.component';
import { HomeComponent } from './content/home/home.component';
import { TicketViewComponent } from './content/ticket/ticket-view/ticket-view.component';
import { TicketListComponent } from './content/ticket/ticket-list/ticket-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path : '', component: ContentComponent , children: [
    { path : '', component: HomeComponent },
    { path : 'ticket', component: TicketComponent, children: [
      { path: '' , component: TicketListComponent },
      { path: 'ticket/:id/view' , component: TicketViewComponent },
    ]},
    { path : 'profile', component: ProfileComponent },
  ]},
  { path : 'login', component: LoginComponent },
  { path : 'about', component: AboutComponent },
  { path : '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
