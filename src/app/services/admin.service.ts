import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private formbuilder: FormBuilder, private http: HttpClient) { } 

    public apiUrl = "http://localhost:5000/api/admin";

    public getAddAdmin() {
      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };

        return this.http.get<any>(this.apiUrl, header);
    }

    public updateAdmin(edit_info) {

      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var body = {
        "id": edit_info.id,
        "name": edit_info.name,
        "email": edit_info.email,
        "password": edit_info.password,
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${user.token}`)
    };

    // let options = new RequestOptions({headers: headers});
  
      return this.http.put<any>(this.apiUrl + "/update", body, header);
    }

    public addAdmin(admin_info) {

      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var body = {
        "name": admin_info.name,
        "email": admin_info.email,
        "password": admin_info.password,
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${user.token}`)
    };

    // let options = new RequestOptions({headers: headers});
  
      return this.http.post<any>(this.apiUrl + "/register", body, header);
    }
}
