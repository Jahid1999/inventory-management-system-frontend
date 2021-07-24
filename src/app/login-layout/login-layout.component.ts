import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {

    constructor(public service: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (localStorage.getItem('userInfo')) {
            this.router.navigateByUrl('dashboard');
        }
    }

    signIn(): void{

        this.service.adminSignInOperation().subscribe(
            (response: any) => {
                if (response) {
                    localStorage.setItem('userInfo', JSON.stringify(response));
                    this.router.navigate(["dashboard"]);
                    this.service.adminSignInformModel.reset();
                }
                else {
                    console.log("not succeed");
                }
            }
        );

    }

}
