import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders: Order[];
    displayedColumns: string[] = ['id', 'request'];
    subscriptions: Subscription[] = [];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        let subscription = this.orderService.getOrders().subscribe(
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
