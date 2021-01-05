import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MyfavoritesComponent } from './myfavorites/myfavorites.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserAuthComponent } from "./userauth/userauth.component"; 

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "auth", component: UserAuthComponent }, 
    { path: "menu", component: MenuComponent },
    { path: "home", component: HomeComponent },
    { path: "dishdetail/:id", component: DishdetailComponent },
    { path: "contact", component: ContactComponent },
    { path: "about", component: AboutusComponent },
    { path: "reservation", component: ReservationComponent },
    { path: "myfavorites", component: MyfavoritesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
