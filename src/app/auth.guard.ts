import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ScrumdataService } from './scrumdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _scrumdataservice: ScrumdataService, private _router: Router) { }

  canActivate(): boolean {
    if (this._scrumdataservice.loggedIn()) {
      return true
    } else {
        this._router.navigate(['login'])
        return false
    }
  }
  
}
