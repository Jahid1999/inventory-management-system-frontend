import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { Transaction } from 'app/model/Transaction';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-typography',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public products: Product [] = [] ;
  public transactions: Transaction [] = [] ;

  reportType = '';
  isDailyReport = false ;
  isMonthlyReport = false ;
  selectedDate = '';
  selectedMonth = ''
  // today: number = Date.now();
  allDateAndTime: Date [] = [] ;
  allMonth: Date [] = [] ;
  date: Date = new Date() ;

  constructor(public service: ProductService, private router: Router) { }

  public redirectOnClick(path: string) {
    this.router.navigateByUrl(path);
  }

  public setReportType(event: Event) {
      if(this.reportType == 'monthly') {
        this.isMonthlyReport = true;
        this.isDailyReport = false;
        this.transactions = [];
      }
      else if (this.reportType == 'daily') {
        this.isDailyReport = true;
        this.isMonthlyReport = false;
        this.transactions = [];
      }
      else {
        console.log('error!!');
      }
   
  }

  public dailyReport (event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.service.getDailyReport(this.selectedDate).subscribe(
      (response: any) => {
          if (response) {
              this.transactions = response;
              this.matchProduct();
          }
      }
    ); 
  }

  public monthlyReport (event: Event) {
    this.selectedMonth = (event.target as HTMLInputElement).value;
    this.service.getMonthlyReport(this.selectedMonth).subscribe(
      (response: any) => {
          if (response) {
              this.transactions = response;
              this.matchProduct();
          }
      }
    ); 
  }

  private matchProduct() {
    this.transactions.forEach(t=> {
      this.products.forEach(p=>{
        if(t.productid == p.id) {
          t.productid = p.name;
        }
      })
    })
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
