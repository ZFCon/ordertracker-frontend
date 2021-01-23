import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    });
    isAuthenticated: Boolean = false;
    error = {};

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.isAuthenticated = this.userService.isAuthenticated();
        this.userService.authChanged.subscribe((isAuthenticated: Boolean) => this.isAuthenticated = isAuthenticated);

        if (this.isAuthenticated) {
            this.router.navigate(['/orders']);
        }
    }

    login() {
        let username = this.loginForm.get('username');
        let password = this.loginForm.get('password');

        this.userService.auth(username.value, password.value).subscribe(
            (data) => {
                this.userService.setToken(data['token']);
                this.router.navigate(['/orders']);
            },
            (data) => {
                this.loginForm.setErrors({ backend: data.error.non_field_errors });
            }
        );
    }
}
