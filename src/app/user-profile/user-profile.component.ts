import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

 public userinfo = {
    name: '',
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
     var user = JSON.parse(localStorage.getItem('isLoggedIn'));
     this.userinfo.name = user.data.name;
     this.userinfo.email = user.data.email;
     this.userinfo.password = user.data.password;
     console.log(user.data);
  }

}
