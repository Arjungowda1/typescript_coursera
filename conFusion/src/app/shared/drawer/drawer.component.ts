import { Component } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { login, LoginResult } from 'ui/dom';
import { getString, setString } from 'tns-core-modules/application-settings';

@Component({
    selector:'draw-content',
    templateUrl:'./shared/drawer/drawer.component.html'
})

export class DrawerComponent{
    constructor(private fontIcon:TNSFontIconService){

    }

    displayLoginDialog(){
        let options = {
            title: "Login",
            message: "Enter your login credentials",
            userName: getString("userName", ""),
            password: getString("password",""),
            okButtonText: "Login",
            cancelButtonText: "Cancel"
        }

        login(options)
            .then((loginResult:LoginResult) =>{
                setString("userName", loginResult.userName);
                setString("password", loginResult.password);
            },
            () => {console.log("Login cancelled");
        });
        }
}