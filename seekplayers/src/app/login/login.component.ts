import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  constructor(public _auth: AuthService, public _router: Router, public _notifications: NotificationsService) { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {console.log(res);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          localStorage.setItem('_id', res.user._id);
          this._router.navigate(['/players']);
        },
        err => {
          console.log(err);
          const toast = this._notifications.error('', err.error.message, {
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: true
          });
          toast.click.subscribe(() => {
            this.loginUser();
        });
        }
      );
  }

  ngOnInit() {
  }

}
