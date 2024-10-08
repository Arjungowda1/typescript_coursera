import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Dish } from '../shared/dish';
import { DishService } from './dish.service';
import { map } from 'rxjs/operators';
import { CouchbaseService } from '../services/couchbase.service';
import { LocalNotifications } from 'nativescript-local-notifications';


@Injectable()

export class FavoriteService {
    favorites: Array <number>;
    docId: string = "favorites";

    constructor(private dishService:DishService,
        private couchbaseService:CouchbaseService) {
        this.favorites = [];

        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null){
            this.couchbaseService.createDocument({"favorites":[]}, this.docId);
        }
        else{
            this.favorites = doc.favorites;
        }
    }

    isFavorite(id:number):boolean{
        return this.favorites.some(el => el == id);
    }

    addFavorite(id:number):boolean{
        if(!this.isFavorite(id))
        {
            this.favorites.push(id);
            this.couchbaseService.updateDocument({"favorites": this.favorites}, this.docId);
            LocalNotifications.schedule([{
                id: +id,
                title: "ConFusion Favorites",
                body: 'Dish ' + id + ' added successfully'
              }])
              .then(() => console.log('Notification scheduled'),
                (error) => console.log('Error showing nofication ' + error));
        }
        return true;
    }


    getFavorites(): Observable<Dish[]> {
        return this.dishService.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
    }

    deleteFavorite(id: number): Observable<Dish[]> {
        let index = this.favorites.indexOf(id);
        if (index >= 0) {
            this.favorites.splice(index,1);
            this.couchbaseService.updateDocument({"favorites": this.favorites}, this.docId);
            return this.getFavorites();
        }
        else {
            return throwError('Deleting non-existant favorite');
        }
    }
}