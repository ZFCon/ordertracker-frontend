import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Order } from './order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    ordersChanged = new EventEmitter<Order[]>();
    private socket: WebSocketSubject<any>;
    private endPoint = 'http://127.0.0.1:8000/api/order/';
    private webSocket = 'ws://127.0.0.1:8000/ws/order/';
    private orders: Order[];

    constructor(private http: HttpClient) {
        this.getOrders().subscribe((orders) => this.ordersChanged.emit(orders.slice()));
        this.getWebSocket();
    }

    getOrders() {
        return this.http.get<Order[]>(this.endPoint);
    }

    getOrder(id) {
        let url = `${this.endPoint}${id}/`;
        return this.http.get(url);
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

    private getWebSocket() {
        if (!this.socket) {
            this.socket = webSocket(this.webSocket);
        }
        this.socket.pipe().subscribe((respo) => this.whatToDo(respo));
    }

    private whatToDo(respo) {
        let type = respo.type;
        let id = respo.id

        this.getOrder(id).subscribe((order: Order) => {
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
        });
    }
}
