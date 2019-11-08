import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';
import { Userproject } from './userproject';
import { Observable, of } from 'rxjs';
import { Creategoal } from './creategoal';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {


  constructor(private _http: HttpClient) { }

  _url = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';
  _goalUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';
  _loginUrl = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';
  _projectRoles = 'https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/';
  _scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';
  updateRoleUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/';
  _sprintUrl = 'http://liveapi.chatscrum.com/scrum/api/scrumsprint/';
  token;
  encode;
  projectId: any;

  public httpOptions = {
  	headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  signup(user: Scrumuser) {
  	return this._http.post<any>(this._url, {'email': user['email'], 'password': user['password'], 'full_name': user['fullname'], 'usertype': user['type'], 'projname': user['projectname']}, this.httpOptions);
  }

  login (user) {
  	return this._http.post<any>(this._loginUrl,{'username': user['email'], 'password': user['password'], 'project': user['projname']}, this.httpOptions)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  allProjectGoals(project_id) {
    return this._http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions);
  }

  createproject(user: Userproject) {
    return this._http.post<any>(this._url, { 'email': user['email'], 'projname': user['projname'], 'full_name': user['fullname'], 'usertype': 'Owner',}, this.httpOptions);
  }
  
  // createUserGoal(user: Creategoal) {
  //   return this._http.get<any>(this._sprintUrl + user['project_id'], this.httpOptions);
  // }

  // createUserGoal(user: Creategoal) {
  //   return this._http.post<any>(this._sprintUrl, { 'goal': user['goal'], 'user': user['user'], 'project_id': user['project_id']}, this.httpOptions);
  // }

  createUserGoal(user: Creategoal){
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.projectId = this.getUser().project_id;
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this._http.post<any>(this._sprintUrl, {'name':user['goal'], 'project_id':this.projectId}, {headers: new HttpHeaders()
      .set('Authorization', `Basic ${this.encode}==`)})
  }

  // createUserGoal (user: Creategoal): Observable<any> {
  //   this.token = this.getUser().token;
  //   this.encode = JSON.parse(localStorage.getItem('Auth'));
  //   this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
  //   return this._http.post(this._goalUrl + this.allProjectGoals(user) + '/', { name: user['goal'] }, {
  //     headers: new HttpHeaders()
  //       .set('Authorization', `Basic ${this.encode}==`)
  //   })
  // }

  updateUser(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this._http.patch(this._goalUrl + user.id + '/', { role: user.role }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.encode}==`)
    })
  }

  updateStatus(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this._http.patch(this._goalUrl + user[4] + '/', { status: user[3] }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.encode}==`)
    })
  }

  logout() {
    return localStorage.clear();
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'))
  }

}