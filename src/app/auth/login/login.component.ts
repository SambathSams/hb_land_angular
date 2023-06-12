import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role = ''
  message = '';
  invalidLogin = false
  form: FormGroup;
  submitted = false;
  @Input()
  error!: string | null;


  constructor(private router: Router, private loginservice: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password_encrypted: ['', Validators.required]
    })
  }
  checkLogin() {
    if (this.form.invalid) {
      this.submitted = true;
    }
    // (this.loginservice.authenticate(this.username, this.password_encrypted, this.role).subscribe(
    //   data => {

    //     if (data.loggedin == "0") {
    //       this.router.navigate(['/home'])
    //     }
    //     else {
    //       this.message = "Account already loggedin"
    //     }
    //   },
    //   error => {
    //     this.invalidLogin = true
    //     this.message = "Invalid Login"
    //   }
    // )
    // );

  }




}
