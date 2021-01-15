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
        this.isAuthenticated = this.userService.isAuthenticated();
        this.userService.authChanged.subscribe((isAuthenticated: Boolean) => this.isAuthenticated = isAuthenticated);
    }
}
