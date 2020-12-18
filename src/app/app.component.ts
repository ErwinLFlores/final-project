import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-project';

  public constructor(private titleService: Title) {}

  public setTitle(title: any){
    this.titleService.getTitle();
  }
}
