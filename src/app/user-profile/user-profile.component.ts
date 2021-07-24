import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
import { Admin } from 'app/model/Admin';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closeaddbutton') closeaddbutton;

   admins: Admin [] = [] ;

 public userinfo = {
    name: '',
    email: '',
    password: ''
  };

  public userEditForm = {
    id: null,
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  public userAddForm = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  passwordMatched = true;
  editPasswordMatched = true;

  constructor(public service: AdminService, private router: Router) { }

  ngOnInit() {
     var user = JSON.parse(localStorage.getItem('userInfo'));
     this.userinfo.name = user.data.name;
     this.userinfo.email = user.data.email;
     this.userinfo.password = user.data.password;

     this.getAdmins();
  }

  private getAdmins() {
    this.service.getAddAdmin().subscribe(
      (response: any) => {
          if (response) {
              this.admins = response;
              
          }
      },
      error => {
        this.showErrorMessage();
      }
  );
  }

  public openEditModal() {
     var user = JSON.parse(localStorage.getItem('userInfo'));
     this.userEditForm.id = user.data.id;
     this.userEditForm.name = user.data.name;
     this.userEditForm.email = user.data.email;
    //  this.userEditForm.password = user.data.password;

  }

  public updateUser() {
    this.service.updateAdmin(this.userEditForm).subscribe(
      (response: any) => {
          if (response) {
              this.closebutton.nativeElement.click();
              this.showMessage('top','center', 'success');

              this.userinfo.name = response.name;
              this.userinfo.email = response.email;
              this.userinfo.password = response.password;

              this.userEditForm.name = response.name;
              this.userEditForm.email = response.email;
              this.userEditForm.password = response.password;

              this.getAdmins();
          }
      },
      error => {
        this.closebutton.nativeElement.click();
        this.showErrorMessage();
      }
  );
  }

  public addUser() {
    this.service.addAdmin(this.userAddForm).subscribe(
      (response: any) => {
          if (response) {
              this.closeaddbutton.nativeElement.click();
              this.showMessage('top','center', 'success');

              this.userAddForm.name = '';
              this.userAddForm.email = '';
              this.userAddForm.password = '';
              this.userAddForm.confirm_password = '';

              this.getAdmins();
          }
          
      },
      error => {
        this.closeaddbutton.nativeElement.click();
        this.showErrorMessage();
      }
  );
  }

  public matchPassword(event: Event) {
      this.userAddForm.confirm_password = (event.target as HTMLInputElement).value;
      if( this.userAddForm.confirm_password !='' && (this.userAddForm.password != this.userAddForm.confirm_password)) {
        this.passwordMatched = false;
      }
      else {
        this.passwordMatched = true;
      }
  }

  public matchEditPassword(event: Event) {
    this.userEditForm.confirm_password = (event.target as HTMLInputElement).value;
    if( this.userEditForm.confirm_password !='' && (this.userEditForm.password != this.userEditForm.confirm_password)) {
      this.editPasswordMatched = false;
    }
    else {
      this.editPasswordMatched = true;
    }
  }

  private showMessage(from, align, type) {
  
    $.notify({
        icon: "notifications",
        message: "Your Request Completed Successfully!!"

    },{
        type: type,
        timer: 4000,
        placement: {
            from: from,
            align: align
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
