import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
    orders: Order[];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.orders = orders;
            }
        );
    }
}
