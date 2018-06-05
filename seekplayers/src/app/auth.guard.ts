import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }

    canActivate(): boolean {          // methode used for frontend displaying options
      if (this._authService.loggedIn()) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    }
}
