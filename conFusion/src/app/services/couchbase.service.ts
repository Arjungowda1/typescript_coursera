import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class  CouchbaseService {
    private database:any;

    constructor() {
        this.database = new Couchbase("conFusion");
    }

    public getDocument(id:string){
        return this.database.getDocument(id);
    }

    public createDocument(data:any, id:string){
        return this.database.createDocument(data, id);
    }

    public updateDocument(data:any, id:string){
        return this.database.updateDocument(data, id);
    }

    public deleteDocument(id:string){
        return this.database.deleteDocument(id);
    }
}