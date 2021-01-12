import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'app/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    login() {
        this.userService.auth(this.username, this.password);
    }
}
