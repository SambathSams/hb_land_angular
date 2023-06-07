import { Component, OnInit } from '@angular/core';
import { LanddataService } from '../services/landdata.service';

@Component({
  selector: 'app-newpwd',
  templateUrl: './newpwd.component.html',
  styleUrls: ['./newpwd.component.css']
})
export class NewpwdComponent implements OnInit {

  changepwd = {
    username:'',
    password_encrypted: ''
   };
  message = '';
  updatepassword: any[] = [];

  constructor(private landdataService: LanddataService) { }

  ngOnInit(): void {
    this.message = '';
  }

  updatenewpassword(): void {

    let user = sessionStorage.getItem('usernamedata');
    if(this.changepwd.username == user){
      this.landdataService.updatepwd(this.changepwd)
      .subscribe(response => {
        this.message = response.message ? response.message : 'Password was updated successfully!';
      },
        error => {
          console.log(error);
        });
      }
    else{
    this.message = "Enter correct Username"
       }
  }
}
