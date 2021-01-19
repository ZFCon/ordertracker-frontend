import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/order';
import { OrderService } from 'app/order.service';
import { MatButtonModule } from '@angular/material/button';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    order: Order;
    orders: Order[];
    subscriptions: Subscription[] = [];

    constructor(private orderService: OrderService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe((orders) => {
            let routerSubscription = this.route.params.subscribe(
                (params) => {
                    let id = params.id;
                    this.order = this.orders.find(order => order.id == id);
                }
            );
            this.subscriptions.push(routerSubscription);
        });

        let ordersSubscription = this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.orders = orders;
            }
        );
        this.subscriptions.push(ordersSubscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
