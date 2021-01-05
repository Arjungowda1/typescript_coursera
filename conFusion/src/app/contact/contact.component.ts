import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';

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
}