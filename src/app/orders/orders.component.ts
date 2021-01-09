import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
    orders: Order[];
    displayedColumns: string[] = ['id', 'request'];

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.orders = orders;
            }
        );
    }
}
