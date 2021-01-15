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
    private orders: Order[];

    constructor(private http: HttpClient) { }

    getOrders() {
        this.getEndPoint();
        this.getWebSocket();

        return this.orders;
    }

    getOrder(id) {
        return this.orders.find(order => order.id == id);
    }

    addOrder(order: Order) {
        let index = this.orders.findIndex(object => object.id === order.id);

        if (index == -1) {
            this.orders.push(order);
        }
    }

    updateOrder(order: Order) {
        let index = this.orders.findIndex(object => object.id === order.id);
        this.orders[index] = order;
    }

    deleteOrder(order: Order) {
        let index = this.orders.findIndex(object => object.id === order.id);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
    }

    private getEndPoint() {
        let that = this;
        this.http.get<Order[]>(this.endPoint).subscribe(
            function (orders) {
                that.orders = orders;
                that.ordersChanged.emit(that.orders.slice());
            }
        );
    }

    private getWebSocket() {
        if (!this.socket) {
            this.socket = webSocket(this.webSocket);
        }
        this.socket.pipe().subscribe((respo) => this.whatToDo(respo));
    }

    private whatToDo(respo) {
        let type = respo.type;
        let order = respo.order

        switch (type) {
            case 'created': {
                this.addOrder(order);
                break;
            }
            case 'updated': {
                this.updateOrder(order);
                break;
            }
            case 'deleted': {
                this.deleteOrder(order);
                break;
            }
        }

        this.ordersChanged.emit(this.orders.slice());
    }
}
