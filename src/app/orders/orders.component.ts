import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders: Order[];
    displayedColumns: string[] = ['id', 'owner', 'request', 'hasDoer'];
    subscriptions: Subscription[] = [];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe(orders => { this.orders = orders; console.log(orders); });
        let subscription = this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.orders = orders;
            }
        );

        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
