import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  constructor(public _auth: AuthService, public _router: Router) { }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('_id', res.user._id);
          this._router.navigate(['/special']);
        },
        err => console.log(err)
      );
  }

  ngOnInit() {
  }

}
