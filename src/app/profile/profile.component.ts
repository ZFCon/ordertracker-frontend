import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { UserService } from 'app/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getUser().subscribe((user: User) => this.user = user);
    }

}
