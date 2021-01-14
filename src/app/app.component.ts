import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'Order Tracker';
    isAuthenticated: Boolean = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.isAuthenticated().subscribe((isAuthenticated) => this.isAuthenticated = isAuthenticated);
    }
}
