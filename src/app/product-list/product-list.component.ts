import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/model/Product';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';

declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class TableListComponent implements OnInit {
  @ViewChild('closeeditbutton') closeeditbutton;
  @ViewChild('closeaddbutton') closeaddbutton;
  @ViewChild('closedeletebutton') closedeletebutton;
  @ViewChild('closepurchasebutton') closepurchasebutton;
  @ViewChild('closesalebutton') closesalebutton;

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

  public stockForm = {
   productid: null,
   type: null,
   quantity: 0,
   totalprice: 0,
  }

  public id_delete = null;
  public selectedProduct = {
    name: '',
    price: null,
    quantity: null,
  };

  constructor(public service: ProductService, private router: Router) { }

  public redirectOnClick(path: string) {
    this.router.navigateByUrl(path);
  }

// open modals

  public openEditModal(product) {
    this.productEditForm.id = product.id;
    this.productEditForm.name = product.name;
    this.productEditForm.description = product.description;
    this.productEditForm.unit = product.unit;
    this.productEditForm.price = product.price;
 }

 public openPurchaseModal(product) {
    this.stockForm.productid = product.id;
    this.stockForm.type = 1;

    this.selectedProduct.name = product.name;
    this.selectedProduct.price = product.price;
 }

 public openSaleModal(product) {
  this.stockForm.productid = product.id;
  this.stockForm.type = 0;

  this.selectedProduct.name = product.name;
  this.selectedProduct.price = product.price;
  this.selectedProduct.quantity = product.quantity;
}

// CALCULATE VALUE

public calculateTotalPrice(event: Event) {
    var quantity = (event.target as HTMLInputElement).value;
    this.stockForm.totalprice = this.selectedProduct.price * this.stockForm.quantity;

    if( this.stockForm.type == 0 && (this.stockForm.quantity > this.selectedProduct.quantity) ){
      alert("Qunatity must be less then or equal to " + this.selectedProduct.quantity);
      this.stockForm.quantity = 0;
    }
}

// purchase 

public purchaseProduct() {
    this.stockForm.totalprice = this.selectedProduct.price * this.stockForm.quantity;
    this.service.purchaseProduct(this.stockForm).subscribe(
      (response: any) => {
          if (response) {
              this.closepurchasebutton.nativeElement.click();
              this.getProducts();
              this.showSuccessMessage();
          }
      },
      error => {
        this.closepurchasebutton.nativeElement.click();
        this.showErrorMessage();
        }
    );
}

// sale

public saleProduct() {
    this.stockForm.totalprice = this.selectedProduct.price * this.stockForm.quantity;
    this.service.saleProduct(this.stockForm).subscribe(
      (response: any) => {
          if (response) {
              this.closesalebutton.nativeElement.click();
              this.getProducts();
              this.showSuccessMessage();
          }
          
      },
      error => {
        this.closesalebutton.nativeElement.click();
        this.showErrorMessage();
        }
    );
}

//update 

 public updateProduct() {
    this.service.updateProduct(this.productEditForm).subscribe(
      (response: any) => {
          if (response) {
              this.closeeditbutton.nativeElement.click();
              this.getProducts();
              this.showSuccessMessage();
          }
         
      },
      error => {
        this.closeeditbutton.nativeElement.click();
        this.showErrorMessage();
      }
    );
  }

  // create

  public createProduct() {
      this.service.createProduct(this.productAddForm).subscribe(
        (response: any) => {
            if (response) {
                this.closeaddbutton.nativeElement.click();
                this.getProducts();
                this.showSuccessMessage();
            }
            
        },
        error => {
          this.closeaddbutton.nativeElement.click();
          this.showErrorMessage();
        }
        );
    }

    public setDeleteId(product) {
        this.id_delete = product.id
    }

    // delete

    public deleteProduct () {
        this.service.deleteProduct(this.id_delete).subscribe(
          (response: any) => {
                this.closedeletebutton.nativeElement.click();
                this.getProducts();
                this.showSuccessMessage();
            },
            error => {
              this.closedeletebutton.nativeElement.click();
              this.showErrorMessage();
          }
        );
      
    }

// get products

  private getProducts() {
      this.service.getAllProducts().subscribe(
        (response: any) => {
            if (response) {
                this.products = response;
            }
        }
    );
  }
 
  ngOnInit() {
    this.getProducts();
  }

  // notifications

  private showSuccessMessage() {
  
    $.notify({
        icon: "notifications",
        message: "Your request successfully completed!!"

    },{
        type: 'success',
        timer: 4000,
        placement: {
            from: 'top',
            align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  private showErrorMessage() {
  
    $.notify({
        icon: "notifications",
        message: "Sorry!! Couldn't complete you request for some errors! Please try again."

    },{
        type: 'danger',
        timer: 4000,
        placement: {
            from: 'top',
            align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
