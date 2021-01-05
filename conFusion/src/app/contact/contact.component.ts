import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as Phone from 'nativescript-phone';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage implements OnInit {

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL,
        private fonticon: TNSFontIconService) {
        super(changeDetectorRef);

    }

    ngOnInit() {


    }

    sendEmail(){
        Email.available()
        .then((avail : boolean)=>{
        if (avail){
            Email.compose({
                to: ['confusion@net.in'],
                subject: 'Query',
                body: 'Dear sir/madam'
            });
        }
        else{
            console.log("No email found")
        }
        })
    }

    callRestaurant(){
        Phone.dial('+852 1234 5678', true);
    }
}