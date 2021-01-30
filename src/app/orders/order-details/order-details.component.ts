import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/order';
import { OrderRequestService } from 'app/order-request.service';
import { OrderService } from 'app/order.service';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
    @Input() order: Order;
    requestErrors: String[];
    orderErrors: String[];

    constructor(private requestService: OrderRequestService, private orderService: OrderService) { }

    ngOnInit() {
    }

    acceptRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, true).subscribe(
            data => console.log(data),
            data => {
                this.requestErrors = data.error.non_field_errors;
                console.log(this.requestErrors);
            }
        );
    }

    refuseRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, false).subscribe(
            data => console.log(data),
            data => this.requestErrors = data.error.non_field_errors
        );
    }

    createDoerRequest(orderId) {
        this.orderService.createDoerRequest(orderId).subscribe(
            data => console.log(data),
            data => this.orderErrors = data.error.non_field_errors,
        )
    }
}
