import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlatformService } from './services/platform.service';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy{ 
    constructor(public platformService: PlatformService)
    {

    }
    ngOnDestroy() {
        this.platformService.printPlatformInfo();
        this.platformService.startMonitoringNetwork()
        .subscribe((message:string) => {
            console.log(message);
        });
    }
    ngOnInit(){
        this.platformService.startMonitoringNetwork();
    }
}
