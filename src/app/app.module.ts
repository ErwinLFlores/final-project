import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { ProfileComponent } from './content/profile/profile.component';
import { TicketComponent } from './content/ticket/ticket.component';
import { SideProfileComponent } from './content/side-profile/side-profile.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http';
import { TicketViewComponent } from './content/ticket/ticket-view/ticket-view.component';
import { TicketListComponent } from './content/ticket/ticket-list/ticket-list.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    ProfileComponent,
    TicketComponent,
    SideProfileComponent,
    LoginComponent,
    AboutComponent,
    TicketViewComponent,
    TicketListComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
