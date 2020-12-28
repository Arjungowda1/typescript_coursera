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
import { ToastDuration, ToastPosition, Toasty } from 'nativescript-toasty';
import { CommentModalComponent } from '../comment/comment.component';
import { action, View } from '@nativescript/core/ui';
import { Page } from '@nativescript/core/ui/page';
import { Animation, AnimationDefinition } from '@nativescript/core/ui/animation';
import { SwipeGestureEventData, SwipeDirection } from '@nativescript/core/ui/gestures';
import { Color } from "tns-core-modules/color";
import * as enums from '@nativescript/core/ui/enums';


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

  showComments: boolean = false;
  cardImage: View;
  commentList: View;
  cardLayout: View;


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private favoriteService:FavoriteService,
    private fonticon:TNSFontIconService,
    private _modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    private page: Page,
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
        const toast = new Toasty({text:"Added Dish " + this.dish.id}).setToastDuration(ToastDuration.LONG)
        .setToastPosition(ToastPosition.BOTTOM);
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

  onSwipe(args: SwipeGestureEventData){
    if(args.direction === SwipeDirection.up){
      this.animateUp();
    }
    else if(args.direction ==  SwipeDirection.down){
      this.animateDown();
    }
  }


  showAndHideComments(){
    if(!this.showComments){
      this.animateUp();
    }
    else{
      this.animateDown();
    }
  }


  animateUp(){
    if(this.dish && !this.showComments){
      this.cardImage = this.page.getViewById<View>('cardImage');
      this.cardLayout = this.page.getViewById<View>('cardLayout');
      this.commentList = this.page.getViewById<View>('commentList');

      let definitions = new Array<AnimationDefinition>();
      
      let a1: AnimationDefinition = {
        target:this.cardImage,
        scale:{ x: 1, y:0},
        translate: { x:0 , y:-200},
        opacity: 0,
        duration: 500,
        curve:enums.AnimationCurve.easeIn
      };
      definitions.push(a1);

      let a2: AnimationDefinition = {
        target:this.cardLayout,
        backgroundColor: new Color('#ff01c7'),
        duration:500,
        curve:enums.AnimationCurve.easeIn
      };
      definitions.push(a2);

      let animationSet =  new Animation(definitions);
      animationSet.play()
      .then(() => {
        this.showComments = true;
      })
      .catch((e) => {
        console.log(e.message);
      })
    }
  }

  animateDown() {
    if(this.dish && !this.showComments){
      this.cardImage = this.page.getViewById<View>('cardImage');
      this.cardLayout = this.page.getViewById<View>('cardLayout');
      this.commentList = this.page.getViewById<View>('commentList');

      this.showComments = false;

    let definitions = new Array<AnimationDefinition>();
    let a1: AnimationDefinition = {
        target: this.cardImage,
        scale: { x: 1, y: 1 },
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a1);

    let a2: AnimationDefinition = {
        target: this.cardLayout,
        backgroundColor: new Color("#ffffff"),
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a2);

    let animationSet = new Animation(definitions);

    animationSet.play().then(() => {
    })
    .catch((e) => {
        console.log(e.message);
    });
  } 
}
}