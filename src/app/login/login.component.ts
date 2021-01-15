import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;
    isAuthenticated: Boolean = false;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.isAuthenticated = this.userService.isAuthenticated();
        this.userService.authChanged.subscribe((isAuthenticated: Boolean) => this.isAuthenticated = isAuthenticated);

        if (this.isAuthenticated) {
            this.router.navigate(['/orders']);
        }
    }

    login() {
        this.userService.auth(this.username, this.password);
        this.router.navigate(['/orders']);
    }
}
