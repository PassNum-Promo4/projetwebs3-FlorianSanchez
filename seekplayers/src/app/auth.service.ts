import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenKey } from '@angular/core/src/view';
@Injectable()
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _accountUrl = 'http://localhost:3000/api/account';
  public user: any = null;

  constructor(private http: HttpClient, private _router: Router) {
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/players']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  modifyAccount(user) {
    return this.http.put<any>(this._accountUrl, user);
  }

  deleteAccount(user) {
    return this.http.delete<any>(this._accountUrl + '/' + user);
    }
}
