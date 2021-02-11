import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { Order } from 'app/order';
import { OrderRequestService } from 'app/order-request.service';
import { OrderService } from 'app/order.service';
import * as ol from "openlayers";
// import sync from 'ol-hashed';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
    @Input() order: Order;
    requestErrors: string[];
    orderErrors: string[];
    private expanded: Boolean;
    private panelId: string;
    private mapId: string;
    private map: ol.Map;
    private source: ol.source.Vector;
    private layer: ol.layer.Vector;
    private location: ol.Coordinate;

    constructor(private requestService: OrderRequestService, private orderService: OrderService) { }

    ngOnInit() {
        this.panelId = `panel-${this.order.id}`

        let expanded = localStorage.getItem(this.panelId);
        this.expanded = true ? expanded == 'true' : false;

        this.mapId = `map-${this.order.id}`;
        this.source = new ol.source.Vector();
        this.layer = new ol.layer.Vector({ source: this.source });
    }

    ngAfterViewInit() {
        this.createMap(this.mapId);
        // get your location
        navigator.geolocation.watchPosition(res => {
            let coords = res.coords;
            this.location = ol.proj.fromLonLat([coords.latitude, coords.longitude]);
            this.setLocationPoint(this.location);
        });
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
        this.map.addLayer(this.layer);

        let orderLocation = this.order.location;
        if(orderLocation) {
            let orderSource = new ol.source.Vector();
            let orderLayer = new ol.layer.Vector({ source: orderSource });
            let orderStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    stroke: new ol.style.Stroke({
                        color: 'green',
                        width: 1.25
                    }),
                radius: 5
                })
            });

            orderLayer.setStyle(orderStyle);

            let orderPoint = ol.proj.fromLonLat(orderLocation.coordinates);
            orderSource.addFeature(new ol.Feature(new ol.geom.Point(orderPoint)));
        }
    }

    setLocationPoint(location) {
        if(location) {
            this.source.clear();
            this.source.addFeature(new ol.Feature(new ol.geom.Point(this.location)));
            
            this.map.getView().setZoom(10);
            this.map.getView().setCenter(this.location);
        }
    }
}
