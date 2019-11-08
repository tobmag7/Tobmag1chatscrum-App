import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {

  constructor(private _scrumdataservice: ScrumdataService, private _router: Router) { }

  ngOnInit() {
    this._scrumdataservice.logout();
    this._router.navigate(['login']);
  }

}
