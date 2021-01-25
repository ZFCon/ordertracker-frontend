import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'app/user.service';

@Injectable({
    providedIn: 'root'
})
export class OrderRequestService {

    constructor(private http: HttpClient, private userService: UserService) { }

    private getUrl(orderId, requestId) {
        return `http://127.0.0.1:8000/api/order/${orderId}/requests/${requestId}/`;
    }

    private getHeaders() {
        let headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `token ${this.userService.getToken()}`
            })
        };

        return headers;
    }

    requestStatueUpdate(orderId, requestId, accepted: boolean = false) {
        let status = accepted ? 'accepted' : 'refused';

        let url = this.getUrl(orderId, requestId);
        let headers = this.getHeaders();
        let payload = {
            status: status,
        }

        return this.http.patch(url, payload, headers);
    }
}
