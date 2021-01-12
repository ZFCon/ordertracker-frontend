import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = "http://127.0.0.1:8000/api/user/";
    private authUrl = "http://127.0.0.1:8000/api/auth/";
    private token;
    private httpOptions;

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    getUser() {
        return this.http.get(this.userUrl, this.httpOptions);
    }

    auth(username: String, password: String) {
        this.http.post(this.authUrl, { username: username, password: password }, this.httpOptions).subscribe(data => localStorage.setItem('token', data.token));
    }
}
