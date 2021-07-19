import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../app/model/Product';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';

declare var $: any;

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit {
  @ViewChild('closeeditbutton') closeeditbutton;

  id: string;
  public product = {
    name: "",
    description: "",
    unit: "",
    price: null,
    quantity: null,
  };

  public productForm = {
    id: null,
    name: "",
    description: "",
    unit: "",
    price: null,
    quantity: null,
  };

  constructor(public service: ProductService, private route: ActivatedRoute) { }

  public openEditModal() {
    this.productForm.id = this.id;
    this.productForm.name = this.product.name;
    this.productForm.description = this.product.description;
    this.productForm.unit = this.product.unit;
    this.productForm.price = this.product.price;
    this.productForm.quantity = this.product.quantity;
  }

  public updateProduct() {
    this.service.updateProduct(this.productForm).subscribe(
      (response: any) => {
          if (response) {
              this.closeeditbutton.nativeElement.click();
              this.getProduct();
              this.showSuccessMessage();
          }
         
      },
      error => {
        this.closeeditbutton.nativeElement.click();
        this.showErrorMessage();
      }
    );
  }


  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getProduct();
  }

  private getProduct() {
    this.service.getProductById(this.id).subscribe(
      (response: any) => {
          if (response) {
              this.product = response;
              console.log(this.product);
          }
      }
  );
  }


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
