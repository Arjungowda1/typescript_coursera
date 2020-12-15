import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";


import { DishService } from './services/dish.service';
import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DrawerComponent } from './shared/drawer/drawer.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent
    ],
    providers: [
        {provide:'BaseURL', useValue: baseURL},
        DishService,
        ProcessHTTPMsgService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
