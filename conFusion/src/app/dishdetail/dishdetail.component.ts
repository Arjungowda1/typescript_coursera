import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FavoriteService } from '../services/favorite.service';
import {TNSFontIconService} from 'nativescript-ngx-fonticon';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular/common';
import { Toasty } from 'nativescript-toasty';
import { CommentModalComponent } from '../comment/comment.component';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html'
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  comment: Comment;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private favoriteService:FavoriteService,
    private fonticon:TNSFontIconService,
    private _modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {

    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { 
          this.dish = dish;
          this.favorite = this.favoriteService.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;

          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
          this.avgstars = (total/this.numcomments).toFixed(2);
        },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  addToFavorites() {
    if (!this.favorite) {
        console.log('Adding to Favorites', this.dish.id);
        this.favorite = this.favoriteService.addFavorite(this.dish.id);
        const toast = new Toasty("Added Dish " + this.dish.id, "short", "bottom");
        toast.show();
    }
}

  goBack(): void {
    this.location.back();
  }

  displayActionDialog() {

    let options = {
        title: "Actions",
        message: "Choose your action",
        cancelButtonText: "Cancel",
        actions: ["Add to Favorites", "Add Comment"]
    };

    action(options).then((result) => {
        if (result === "Add to Favorites") {
            this.addToFavorites();
        }
        else{
            this.createModalView();
        }
    });

}

createModalView() {

  let options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      fullscreen: false
  };

  this._modalService.showModal(CommentModalComponent, options)
      .then((result: any) => {
          this.dish.comments.push(result);
      });

}
}