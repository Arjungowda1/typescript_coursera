import { Component } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
@Component({
    selector:'draw-content',
    templateUrl:'./shared/drawer/drawer.component.html'
})

export class DrawerComponent{
    constructor(private fontIcon:TNSFontIconService){

    }
}