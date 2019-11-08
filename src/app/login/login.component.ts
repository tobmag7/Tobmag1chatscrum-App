import { Component, OnInit } from '@angular/core';
import { ScrumdataService } from '../scrumdata.service'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  scrumUserLoginData = {email: null, password: null, projname: ''}

  constructor(private _scrumdataservice: ScrumdataService, private _router: Router) { }

  ngOnInit() {
  }

  feedback = ""

  rose(message, data) {
    var x = document.getElementById("alert");
    document.getElementById('alert').innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  onLoginSubmit () {
  	this._scrumdataservice.login (this.scrumUserLoginData).subscribe(
  	data => {
  		console.log('success', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('Auth', JSON.stringify(this.scrumUserLoginData))
  		this._router.navigate(['/scrumboard', data['project_id']])
  	},
  	error => {
  		this.rose('Invalid email or password', console.log(error))
  	  }
  	)
  }

  

}
