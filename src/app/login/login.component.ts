import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../services/auth-gaurd.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password_encrypted = ''
  role = ''
  message = '';
  invalidLogin = false

  @Input()
  error!: string | null;


  constructor(private router: Router,private loginservice: AuthenticationService) {}

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }

  }
  checkLogin() {

    (this.loginservice.authenticate(this.username, this.password_encrypted, this.role).subscribe(
      data => {

        if (data.loggedin == "0") {
        this.router.navigate(['/home'])
         }
         else {
          this.message = "Account already loggedin"
        }
      },
      error => {
        this.invalidLogin = true
        this.message = "Invalid Login"
      }
    )
    );

  }




}
