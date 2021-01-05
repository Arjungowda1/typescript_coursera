import { Component } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { login, LoginResult } from 'ui/dom';

@Component({
    selector:'draw-content',
    templateUrl:'./shared/drawer/drawer.component.html'
})

export class DrawerComponent{
    constructor(private fontIcon:TNSFontIconService){

    }

 
}