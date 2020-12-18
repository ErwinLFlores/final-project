import { Component, OnInit } from '@angular/core';
import { Profile } from './profile-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: GlobalService,
    private route: Router,
    private titleService: Title) { }

  profileForm: any;

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    job_title: '',
    mobile_number: '',
    password: '',
  }

  ngOnInit(): void {
    this.titleService.setTitle('Profile');

    this.service.httpGetProfile();

    this.service.checkLogStatus();

    if(this.service.getToken() === ''){
      this.route.navigate(['/']);
    }

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.fillForm(profile);
      }
    );

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required , Validators.email]),
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      job_title: new FormControl('',[Validators.required]),
      mobile_number: new FormControl('',[Validators.required]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  fillForm(profile: any): void{
    this.profileForm.patchValue({
      first_name: profile.meta.first_name,
      last_name: profile.meta.last_name,
      email: profile.email,
      alias: profile.alias,
      job_title: profile.meta.job_title,
      mobile_number: profile.meta.mobile_number,
    });
  }

  onSubmit(): void{
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asian/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }

      this.service.httpUpdateProfile(newFormValues);
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
