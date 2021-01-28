import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/order';
import { OrderRequestService } from 'app/order-request.service';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
    @Input() order: Order;
    errors: String[];

    constructor(private requestService: OrderRequestService) { }

    ngOnInit() {
    }

    acceptRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, true).subscribe(
            data => console.log(data),
            data => this.errors = data.error.non_field_errors
        );
    }

    refuseRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, false).subscribe(
            data => console.log(data),
            data => this.errors = data.error.non_field_errors
        );
    }
}
