import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef} from '@angular/core';
import { FavoriteService } from "../services/favorite.service";
import { Dish } from '../shared/dish';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui-pro/listview';
import { RadListViewComponent } from 'nativescript-telerik-ui-pro/listview/angular';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { View } from 'tns-core-modules/ui/core/view';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { Toasty } from 'nativescript-toasty';
@Component({
    selector:'app-myfavorites',
    templateUrl:'./myfavorites.component.html',
    styleUrls:['./myfavorites.component.css']
})
export class  MyfavoritesComponent extends DrawerPage implements OnInit {
    
    favorites:ObservableArray<Dish>;
    errMess:string;

    @ViewChild('myListView') listViewComponent: RadListViewComponent;

    constructor(@Inject('BaseURL')public BaseURL,
    private favoriteService:FavoriteService,
    private changedetectorref:ChangeDetectorRef ) {
        super(changedetectorref);
    }

    ngOnInit(){
        this.favoriteService.getFavorites()
        .subscribe(favorites => this.favorites =  new ObservableArray(favorites),
        err => this.errMess = err);
    }

    deleteFavorite(id: number){
        let options = ({
            title: "Confirm Delete",
            message: 'Do you want to delete Dish '+ id,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        });
    
    }

    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if(args.data.x > 200) {

        }
        else if (args.data.x < -200) {

        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];

        var leftItem = swipeView.getViewById<View>('mark-view');
        var rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth()/2;
    }

    public onSwipeCellFinished(args: ListViewEventData) {

    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log('Left swipe click');
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args: ListViewEventData) {
        this.deleteFavorite(args.object.bindingContext.id);
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }
}