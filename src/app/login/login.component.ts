import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor() { }

    ngOnInit() {
    }

    login() {
        console.log(this.username, this.password);
    }
}
