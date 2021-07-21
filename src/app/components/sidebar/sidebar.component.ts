import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/products', title: 'Product List',  icon:'content_paste', class: '' },
    { path: '/reports', title: 'Reports',  icon:'library_books', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('login');
   }
}
