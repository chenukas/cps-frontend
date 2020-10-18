import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    address: '',
    telephone: '',
    userType: '',
    site: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  //http requests
  //register user to the system
  postUser(user: User) {
    return this.http.post(
      environment.apiHost + '/register',
      user,
      this.noAuthHeader
    );
  }

  //authenticate user when logged in
  login(authCredentials) {
    return this.http.post(
      environment.apiHost + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  //get details of logged in user
  getUserProfile() {
    return this.http.get(environment.apiHost + '/userProfile');
  }

  //get all details of users
  getAllUsers() {
    return this.http.get(environment.apiHost + '/users');
  }

  //get list of site managers
  getSiteManagers() {
    return this.http.get(environment.apiHost + '/sitemanagers');
  }

  //remove users from the system by Id
  deleteUserById(id: string) {
    return this.http.delete(environment.apiHost + '/users/' + id);
  }

  //helper methods
  //save auth token to browser
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //access auth token when doing http requests
  getToken() {
    return localStorage.getItem('token');
  }

  //remove saved auth token
  deleteToken() {
    localStorage.removeItem('token');
  }

  //decode the user token
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  //checking whether there is valid auth token
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
