import { Component, OnInit } from '@angular/core';
import { Product } from '../../app/model/Product';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public products: Product [] = [] ;

  constructor(public service: ProductService, private router: Router) { }

  public redirectOnClick(path: string) {
    this.router.navigateByUrl(path);
  }
 
  ngOnInit() {
    this.service.getAllProducts().subscribe(
      (response: any) => {
          if (response) {
              this.products = response;
          }
          else {
              console.log("not succeed");
          }
      }
  );
  }

}
