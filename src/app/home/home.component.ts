import { Component, OnInit } from '@angular/core';
import { Order } from 'app/order';
import { OrderService } from 'app/order.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    orders: Order[];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        // this.orders = this.orderService.getOrders();
        // this.orderService.ordersChanged.subscribe(orders => this.orders = orders);

        // console.log(this.orders);

        this.orderService.getOrder(12).subscribe(console.log);
    }

}
