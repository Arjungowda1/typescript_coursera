import { Injectable } from '@angular/core';
import { isAndroid, isIOS, device, screen } from 'tns-core-modules/platform';
import  * as Connectivity from 'tns-core-modules/connectivity';
import { Observable } from 'rxjs';

class DeviceInfo{
    constructor(
        public model: string,
        public deviceType: string,
        public os: string,
        public osVersion: string,
        public sdkVersion: string,
        public language: string,
        public manufacturer: string,
        public uuid: string
    ) { }
}

class ScreenInfo{
    constructor(
        public heightDIPs: number,
        public heightPixels: number,
        public scale: number,
        public widthDIPs: number,
        public widthPixels: number
    ) { }
}

@Injectable()
export class PlatformService {

    public deviceInformation: DeviceInfo;
    public screenInformation: ScreenInfo;
    public connectionType: string;

    constructor(){
        this.deviceInformation = new DeviceInfo(
            device.model,
            device.deviceType,
            device.os,
            device.osVersion,
            device.sdkVersion,
            device.language,
            device.manufacturer,
            device.uuid
        );

        this.screenInformation =  new ScreenInfo(
            screen.mainScreen.heightDIPs,
            screen.mainScreen.heightPixels,
            screen.mainScreen.scale,
            screen.mainScreen.widthDIPs,
            screen.mainScreen.widthPixels
        );

        let connectionType = Connectivity.getConnectionType();
        switch(connectionType){
            case Connectivity.connectionType.none:
                this.connectionType = "None";
                break;
            case Connectivity.connectionType.wifi:
                this.connectionType = "WiFi";
                break;
            case Connectivity.connectionType.mobile:
                this.connectionType = "Mobile";
                break;
            default:
                break;
        }
    }


    public isAndroid(): boolean {
        return isAndroid;
    }

    public isIOS(): boolean {
        return isIOS;
    }

    public screenWidthDIP(): number {
        return this.screenInformation.widthDIPs;
    }

    public networkConnectionType(): string {
        return this.connectionType;
    }
    
    public startMonitoringNetwork(): Observable<string>{
        return Observable.create((observer) =>
        {
            Connectivity.startMonitoring((newConnectionType: number) => {
                switch(newConnectionType){
                    case Connectivity.connectionType.none:
                        this.connectionType = "None";
                        observer.next('Connection type changed to none');
                        break;
                    case Connectivity.connectionType.wifi:
                        this.connectionType = "WiFi";
                        observer.next('Connection type changed to WiFi');
                        break;
                    case Connectivity.connectionType.mobile:
                        this.connectionType = "Mobile";
                        observer.next('Connection type changed to Mobile');
                        break;
                    default:
                        break;
                }
            });
        });
    }   

    public stopMonitoringNetwork(){
        Connectivity.stopMonitoring();
    }

    public printPlatformInfo(){
        console.log('This device is ' + this.deviceInformation.deviceType);
    }
}
