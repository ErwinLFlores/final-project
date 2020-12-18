import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isLogged:boolean;

  logins: Login = {
    username: '',
    password: '',
  }

  constructor(
    private service: GlobalService,
    private route: Router,
    private titleService: Title) {
    this.isLogged = false;
   }

  ngOnInit(): void {
    this.titleService.setTitle('Login');

    this.service.isLogged.subscribe(
      (logged : any) => {
        this.isLogged = logged;
      }
     );

     this.service.checkLogStatus();

     if(this.isLogged){
      this.route.navigate(['/']);
     }

     this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required , Validators.email]),
      password: new FormControl('',[Validators.required]),
    });

  }

  onLogin(): void{
    if(this.loginForm.valid){
      this.service.httpLogin(this.logins);

      this.service.onHttpLogin.subscribe(
        (response:any) => {
          const token = response.token;
          this.service.setToken(token);

          // console.log('token from service', this.service.getToken());
          this.route.navigate(['/']);
        },
      );
    }else{
      this.alertInfo('Please complete all required fields');
    }
  }

  alertInfo(message:string){
    swal.fire({
      icon: 'info',
      title: 'Form Field required',
      text: message
    })
  }



}
