import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  selector: '.app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService) { }

  ngOnInit() {
  }

  userTypes = ['Regular User', 'Project Owner'];

  scrumUserModel = new Scrumuser ('','','','','');

  feedback = ""

  rose(message, data) {
    var x = document.getElementById("alert");
    document.getElementById('alert').innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  onSubmit() {
  	console.log(this.scrumUserModel)
    this._scrumdataService.signup(this.scrumUserModel).subscribe(
    data => this.rose('Account Created Successfully!', console.log(data)),
    error => this.rose('Error Creating Account', console.log(error))
    )
  }

}