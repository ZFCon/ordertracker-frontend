import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from './order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    ordersChanged = new EventEmitter<Order[]>();
    private socket: WebSocketSubject<any>;
    private endPoint = 'http://127.0.0.1:8000/api/orders/';
    private webSocket = 'ws://127.0.0.1:8000/ws/orders/';
    private orders: Order[] = [];

    constructor(private http: HttpClient) {
        this.getEndPoint();
        this.getWebSocket();

    }

    getEndPoint() {
        let that = this;
        this.http.get<Order[]>(this.endPoint).subscribe(
            function (orders) {
                that.orders = orders;
                that.ordersChanged.emit(that.orders.slice());
            }
        );
    }

    getWebSocket() {
        this.socket = webSocket(this.webSocket);
        this.socket.pipe().subscribe((order: Order) => this.whatToDo(order));
    }

    whatToDo(order) {
        let index = this.orders.findIndex(object => object.id === order.id);
        if (index != -1) {
            this.orders[index] = order;
        } else {
            this.orders.push(order);
        }

        this.ordersChanged.emit(this.orders.slice());
    }
}
