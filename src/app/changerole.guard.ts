import { ScrumdataService } from './scrumdata.service'
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeroleGuard implements CanActivate {

  constructor(private scrumDataService: ScrumdataService, private router: Router) { }
  canActivate(): boolean {
    if (this.scrumDataService.getUser().role == 'Owner') {
      return true;
    } else {
      
      this.router.navigate(['/home']);
      return false;
    }
  }

}
