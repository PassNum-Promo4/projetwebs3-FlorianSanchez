import { Component, OnInit, Injectable } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent extends LoginComponent implements OnInit {

  UserData = {  // add property id on UserData
    'id': ''
    };
  constructor(public _auth: AuthService, public _router: Router, public _notifications: NotificationsService) {
    super(_auth, _router, _notifications);
    this._notifications = _notifications;
  }

  modifyAccount() {
    const id = localStorage.getItem('_id');   // get a local storage id then modify account and return to login page
    this.UserData.id = id;

    this._auth.modifyAccount(this.UserData).subscribe(
      res => {
        this._router.navigate(['/login']);
        const toast = this._notifications.success('', res.message, {    // notifications
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true
        });
        toast.click.subscribe(() => {
          this.modifyAccount();
      });
      },
      err => {
        const toast = this._notifications.error('', err.error.message, {  // notifications
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: true
        });
        toast.click.subscribe(() => {
          this.modifyAccount();
      });
      }
    );
  }

  deleteAccount() {
    const id = localStorage.getItem('_id');   // delete account
    this._auth.deleteAccount(id).subscribe( // send id account for api
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
    localStorage.removeItem('_id');     // remove _id and token on localstorage then return to players page
    localStorage.removeItem('token');
    this._router.navigate(['/players']);
  }

  ngOnInit() {
  }

}
