import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders: Order[];
    subscriptions: Subscription[] = [];

    createForm: FormGroup = new FormGroup({
        request: new FormControl(null, Validators.required)
    });

    lat = 51.678418;
    lng = 7.809007;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        let httpSubscription = this.orderService.getOrders().subscribe(orders => this.orders = orders);
        let socketSubscription = this.orderService.ordersChanged.subscribe(orders => this.orders = orders);

        this.subscriptions.push(httpSubscription);
        this.subscriptions.push(socketSubscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    createOrder(form) {
        let request = this.createForm.get('request');

        this.orderService.createOrder(request.value).subscribe(
            data => {
                console.log(data);
                form.resetForm();
            },
            data => console.log(data),
        )
    }
}
