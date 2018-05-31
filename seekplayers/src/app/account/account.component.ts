import { Component, OnInit, Injectable } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent extends LoginComponent implements OnInit {

  UserData = {
    'id': ''
    };
  constructor(public _auth: AuthService, public _router: Router) {
    super(_auth, _router);
  }

  modifyAccount() {
    const id = localStorage.getItem('_id');
    this.UserData.id = id;

    this._auth.modifyAccount(this.UserData).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/login']);
      },
      err => console.log(err)
    );
  }

  deleteAccount() {
    const id = localStorage.getItem('_id');
    this._auth.deleteAccount(id).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/login']);
      },
      err => console.log(err)
    );
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
  }

  ngOnInit() {
  }

}
