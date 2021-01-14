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

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.userService.isAuthenticated().subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.router.navigate(['/orders']);
            }
        });
    }

    login() {
        this.userService.auth(this.username, this.password);
        this.router.navigate(['/orders']);
    }
}
