import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/order';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
    @Input() order: Order;

    constructor() { }

    ngOnInit() {
    }
}
