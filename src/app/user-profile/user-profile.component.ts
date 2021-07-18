import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/services/admin.service';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

 public userinfo = {
    name: '',
    email: '',
    password: ''
  };

  public userEditForm = {
    id: null,
    name: '',
    email: '',
    password: ''
  };
  constructor(public service: AdminService, private router: Router) { }

  ngOnInit() {
     var user = JSON.parse(localStorage.getItem('isLoggedIn'));
     this.userinfo.name = user.data.name;
     this.userinfo.email = user.data.email;
     this.userinfo.password = user.data.password;
     console.log(user.data);
  }

  public openEditModal() {
     var user = JSON.parse(localStorage.getItem('isLoggedIn'));
     this.userEditForm.id = user.data.id;
     this.userEditForm.name = user.data.name;
     this.userEditForm.email = user.data.email;
     this.userEditForm.password = user.data.password;

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

  private showMessage(from, align, type) {
  
    $.notify({
        icon: "notifications",
        message: "Information updated successfully!!"

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

}
