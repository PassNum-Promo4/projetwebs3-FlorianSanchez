import { Component, OnInit } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent extends LoginComponent implements OnInit {

  UserData = {};
  constructor(public _auth: AuthService, public _router: Router) {
    super(_auth, _router);
  }

  modifyAccount() {
    let id = localStorage.getItem('token');
    let user = { 'new_UserData': this.UserData,
    'token': id };

    this._auth.modifyAccount(user).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/login']);
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
  }

}
