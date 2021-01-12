import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://127.0.0.1:8000/api/user/";
  private token = "7c332cbca5b1feaf9077ced75c6809a253a81cc6";
  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `token ${this.token}`,
      })
    };
  }

  getUser() {
    return this.http.get(this.url, this.httpOptions);
  }

  auth() {
    localStorage.setItem('token', this.token);
  }

  gg() {
    console.log(localStorage.getItem('token'));
  }
}
