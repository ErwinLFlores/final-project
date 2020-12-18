import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  onHttpLogin = new Subject();
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpGetTicket = new Subject();
  onHttpUpdateProfile = new Subject();
  subjectTicket = new Subject();

  constructor(private http: HttpClient, private route: Router) {

  }

  httpLogin(logins: any){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this.http.post(url, logins).subscribe(
      (response: any) => {
        if(response.status == 'success'){
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
          this.alertSuccess('Login Success!');
        }
      },
      (error) => {
        if(error.error.message === "Unauthorized access."){
          this.alertError('Invalid email or password','Please login your credentials');
        }else{
          console.log('error response' , error);
        }
      },
    );
  }

  httpGetProfile(): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization','Bearer ' + token)
    }).subscribe(
      (response:any) => {
        if(response.status == 'success'){
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('this is from httpGetProfile Service', error);
        // this.alertError('An Error Occured',error.message);
      }
    );
  }

  httpGetTicket(): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization','Bearer ' + token)
    }).subscribe(
      (response:any) => {
        console.log('this is from httpGetTicket Service', response.data);

        if(response.status == 'success'){
          this.onHttpGetTicket.next(response);
        }
      },
      (error) => {
        this.alertError('An Error Occured',error.error.message);
      }
    );
  }


  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url , data ,{
      headers: new HttpHeaders().set('Authorization','Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is from http update profile service', response);

        if(response.status === 'success'){
          this.onHttpUpdateProfile.next(response.data);
          this.onHttpGetProfile.next(response.data);
          this.alertSuccess('Successfully updated!');
        }
      },
      (error) => {
        // console.log('error reponse in httpUpdateProfile', error);
        this.alertError('An Error Occured', error.message);
      }
    );

  }

  setToken(token:string): void{
    localStorage.setItem('token',token);
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token || '';
  }

  checkLogStatus() : void{
    const token = localStorage.getItem('token');

    if(token){
      this.isLogged.next(true);
    }else{
      this.isLogged.next(false);
    }
  }

  deleteToken(): void{
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

  alertSuccess(message:string){
    swal.fire({
      icon: 'success',
      title: message,
    })
  }

  alertError(title:string,message:string){
    swal.fire({
      icon: 'error',
      title: title,
      text: message
    })
  }
}
