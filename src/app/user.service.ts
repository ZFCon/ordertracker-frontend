import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = "http://127.0.0.1:8000";
    authChanged = new EventEmitter<Boolean>();

    constructor(private http: HttpClient) { }

    auth(username: String, password: String) {
        let url = `${this.baseUrl}/api/auth/`;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        this.http.post(url, { username: username, password: password }, httpOptions).subscribe(data => localStorage.setItem('token', data['token']));
        this.authChanged.emit(true);
    }

    isAuthenticated() {
        let isAuthenticated = this.getToken() != null ? true : false;
        this.authChanged.emit(isAuthenticated);

        return isAuthenticated;
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
