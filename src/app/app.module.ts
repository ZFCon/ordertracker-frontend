import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        OrdersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [HttpClientModule,],
    bootstrap: [AppComponent]
})
export class AppModule { }
