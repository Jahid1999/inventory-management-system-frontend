import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/model/Product';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class TableListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  public products: Product [] = [] ;
  public productEditForm = {
    id: null,
    name: '',
    description: '',
    unit: '',
    price: null
  }

  constructor(public service: ProductService, private router: Router) { }

  public redirectOnClick(path: string) {
    this.router.navigateByUrl(path);
  }

  public openEditModal(product) {
    this.productEditForm.id = product.id;
    this.productEditForm.name = product.name;
    this.productEditForm.description = product.description;
    this.productEditForm.unit = product.unit;
    this.productEditForm.price = product.price;
 }
 public updateProduct() {
  this.service.updateProduct(this.productEditForm).subscribe(
    (response: any) => {
        if (response) {
            this.closebutton.nativeElement.click();
            this.getProducts();
        }
        else {
            console.log("not succeed");
        }
        
    },
    // error => {
    //   console.error('There was an error ball!');
      // }
  );
  }

  private getProducts() {
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
 
  ngOnInit() {
    this.getProducts();
  }

}
