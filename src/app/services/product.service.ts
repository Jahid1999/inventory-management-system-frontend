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
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };

        return this.http.get<any>(this.apiUrl, header);
    }

    public getProductById(id) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };

        return this.http.get<any>(this.apiUrl + `/${id}`, header);
    }

    public updateProduct(edit_info) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
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
    
    public createProduct(edit_info) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var body = {
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
  
      return this.http.post<any>(this.apiUrl + "/add", body, header);
    }

    public purchaseProduct(info) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var body = {
        "type": info.type,
        "productid":info.productid,
        "quantity": info.quantity,
        "totalprice": info.totalprice,
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${user.token}`)
    };

    // let options = new RequestOptions({headers: headers});
  
      return this.http.post<any>(this.apiUrl + "/purchase", body, header);
    }

    public saleProduct(info) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var body = {
        "type": info.type,
        "productid":info.productid,
        "quantity": info.quantity,
        "totalprice": info.totalprice,
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${user.token}`)
    };

    // let options = new RequestOptions({headers: headers});
  
      return this.http.post<any>(this.apiUrl + "/sale", body, header);
    }

    public deleteProduct(id) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
    
      const header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };
  
      return this.http.delete<any>(this.apiUrl + "/delete/" + id, header);
    }

    public getDailyReport(date) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };

        return this.http.get<any>(this.apiUrl + `/report/daily/${date}`, header);
    }

    public getMonthlyReport(month) {
      var user = JSON.parse(localStorage.getItem('userInfo'));
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${user.token}`)
      };

        return this.http.get<any>(this.apiUrl + `/report/monthly/${month}`, header);
    }

}
