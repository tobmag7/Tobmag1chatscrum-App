import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';
import { Userproject } from './userproject';
import { Observable, of } from 'rxjs';
import { Creategoal } from './creategoal';

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
  _sprintUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumsprint/';
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

  createSprint(data): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    console.log(data.project_id)
    return this._http.post(this._sprintUrl + "?" + 'goal_project_id=' + data.project_id, { 'project_id': data.project_id }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.encode}==`).append('Content-Type', 'application/json')
    })
  }

  addGoal(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('Auth'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this._http.post(this._goalUrl, { name: user.goalname, project_id: user.id, user: user.user }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.encode}==`)
    })
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