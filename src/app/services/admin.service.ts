import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private formbuilder: FormBuilder, private http: HttpClient) { } 

    public apiUrl = "http://localhost:5000/api";

  
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
  
      return this.http.put<any>(this.apiUrl + "/admin/update", body, header);
    }
}
