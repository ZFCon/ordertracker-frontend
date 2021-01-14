import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = "http://127.0.0.1:8000";

    constructor(private http: HttpClient) { }

    auth(username: String, password: String) {
        let url = `${this.baseUrl}/api/auth/`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        this.http.post(url, { username: username, password: password }, httpOptions).subscribe(data => localStorage.setItem('token', data['token']));
    }

    isAuthenticated() {
        if (this.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    getToken() {
        let token = localStorage.getItem('token');

        return token;
    }

    getUser() {
        let url = `${this.baseUrl}/api/user/`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `token ${this.getToken()}`
            })
        };
        return this.http.get(url, httpOptions);
    }
}
