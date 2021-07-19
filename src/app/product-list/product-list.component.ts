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
  @ViewChild('closeeditbutton') closeeditbutton;
  @ViewChild('closeaddbutton') closeaddbutton;
  @ViewChild('closedeletebutton') closedeletebutton;

  public products: Product [] = [] ;
  public productEditForm = {
    id: null,
    name: '',
    description: '',
    unit: '',
    price: null
  }

  public productAddForm = {
    name: '',
    description: '',
    unit: '',
    price: null
  }

  public id_delete = null;

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
            this.closeeditbutton.nativeElement.click();
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

  public createProduct() {
    this.service.createProduct(this.productAddForm).subscribe(
      (response: any) => {
          if (response) {
              this.closeaddbutton.nativeElement.click();
              this.getProducts();
          }
          
      },
      // error => {
      //   console.error('There was an error ball!');
        // }
      );
    }

    public setDeleteId(product) {
        this.id_delete = product.id
    }

    public deleteProduct () {
      this.service.deleteProduct(this.id_delete).subscribe(
        (response: any) => {
          console.log('res=' + response);
            if (response) {
              this.closedeletebutton.nativeElement.click();
              this.getProducts();
            }
          },
          error => {
            this.closedeletebutton.nativeElement.click();
            this.getProducts();
        }
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
