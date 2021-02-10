import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/order';
import { OrderRequestService } from 'app/order-request.service';
import { OrderService } from 'app/order.service';
import * as ol from "openlayers";

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
    @Input() order: Order;
    requestErrors: string[];
    orderErrors: string[];
    expanded: Boolean;
    panelId: string;
    private mapId: string;
    private map: ol.Map;

    constructor(private requestService: OrderRequestService, private orderService: OrderService) { }

    ngOnInit() {
        this.panelId = `panel-${this.order.id}`

        let expanded = localStorage.getItem(this.panelId);
        this.expanded = true ? expanded == 'true' : false;

        this.mapId = `map-${this.order.id}`;
        this.createMap(this.mapId);
    }

    panelExpanded(expanded: Boolean) {
        localStorage.setItem(`panel-${this.order.id}`, expanded.toString());
    }

    acceptRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, true).subscribe(
            data => console.log(data),
            data => {
                this.requestErrors = data.error.non_field_errors;
                console.log(this.requestErrors);
            }
        );
    }

    refuseRequest(request) {
        this.requestService.requestStatueUpdate(request.order, request.id, false).subscribe(
            data => console.log(data),
            data => this.requestErrors = data.error.non_field_errors
        );
    }

    createDoerRequest(orderId) {
        this.orderService.createDoerRequest(orderId).subscribe(
            data => console.log(data),
            data => this.orderErrors = data.error.non_field_errors,
        )
    }

    createMap(mapId) {
        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                })
            ],
            target: mapId,
            view: new ol.View({
                center: [0, 0],
                zoom: 2,
            })
        });
        console.log(this.map);

        const locationSource = new ol.source.Vector();
        const locationLayer = new ol.layer.Vector({ source: locationSource });

        this.map.addLayer(locationLayer);

        navigator.geolocation.watchPosition(res => {
            let coords = res.coords;
            let location = ol.proj.fromLonLat([coords.latitude, coords.longitude]);

            locationSource.clear();
            locationSource.addFeatures([
                new ol.Feature(new ol.geom.Point(location)),
              ]);
            this.map.getView().setCenter(location);
        });
    }
}
