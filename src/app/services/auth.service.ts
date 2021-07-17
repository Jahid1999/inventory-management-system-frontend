import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private formbuilder: FormBuilder, private http: HttpClient) { } 

    public authUrl = "http://localhost:52684/api/login/authenticate";

    public adminSignInOperation() {
        var body = {
            "email": this.adminSignInformModel.value.email,
            "password": this.adminSignInformModel.value.password,
            "role": this.adminSignInformModel.value.role,
        }

        return this.http.post<any>(this.authUrl , body);
    }

    adminSignInformModel = this.formbuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
    });

}
