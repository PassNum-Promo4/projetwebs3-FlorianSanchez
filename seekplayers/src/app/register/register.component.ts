import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {};
  public error = {};
  constructor(private _auth: AuthService, private _router: Router,  private _notifications: NotificationsService
  ) { }

  registerUser() {
    this._auth.registerUser(this.registerUserData)    // call registerUser methode on api with a parameter registerUserData
      .subscribe(
        res => {
            localStorage.setItem('user', JSON.stringify(res.user));   // save to localstorage user id
            localStorage.setItem('token', res.token);                  // save to localstorage token id
            localStorage.setItem('_id', res.payload.subject);            // save to localstorage _id value payload
            this._router.navigate(['/players']);                // return to players page
        },
        err => {
          console.log(err);
          const toast = this._notifications.error('', err.error.message, {     // notifications
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: true
          });
          toast.click.subscribe(() => {
            this.registerUser();
        });
        }
      );
  }

  ngOnInit() {
}

}
