import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanddataService } from '../services/landdata.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otp = ''!;
  username!: string | null;
  usernameforOTP = {username: ''};
  invalidLogin = false
  sentmessage = '';
  confirmmessage = '';
  errormessage = '';


  @Input()
  error!: string | null;

  constructor(private landdataService: LanddataService , private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.sentmessage= '';
    this.confirmmessage = '';
  }

  sentotp() {

    const username = this.usernameforOTP.username;
    this.http.get<boolean>(`http://localhost:8080/api/users/${username}`).subscribe(
      response => {
        if (response) {
          (this.landdataService.createotp(this.usernameforOTP).subscribe(
            (response) =>   {
              this.sentmessage = 'OTP was sent successfully!';
            },
            error => {
              this.sentmessage = 'Please enter valid Username';
            }
          ));
        } else {

          this.errormessage = 'Username not found.';
        }
      },
      error => {
        console.log(error);
      }
    );



  }


  checkOtp() {
    let user = sessionStorage.getItem('usernamedata');

    (this.landdataService.verifyotp(this.username = user, this.otp).subscribe(
      data => {
        if (data == "") {
          this.confirmmessage = 'Enter correct OTP !';
        }
        else {
          this.router.navigate(['/newpwd'])
        }
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.message;
      }));

    }

}
