import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private formbuilder: FormBuilder, private http: HttpClient) { } 

    public apiUrl = "http://localhost:5000/api/product";

  
    public getAllProducts() {
      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };
  
        return this.http.get<any>(this.apiUrl, header);
    }

    public updateProduct(edit_info) {
      var user = JSON.parse(localStorage.getItem('isLoggedIn'));
      var body = {
        "id": edit_info.id,
        "name": edit_info.name,
        "description": edit_info.description,
        "unit": edit_info.unit,
        "price": edit_info.price,
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${user.token}`)
    };

    // let options = new RequestOptions({headers: headers});
  
      return this.http.put<any>(this.apiUrl + "/update", body, header);
    }
    

}
