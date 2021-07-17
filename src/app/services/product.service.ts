import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private formbuilder: FormBuilder, private http: HttpClient) { } 

    public URL = "http://localhost:5000/api/product";

  
    public getAllProducts() {
      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };
  
        return this.http.get<any>(this.URL, header);
    }

}
