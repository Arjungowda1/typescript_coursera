import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
    { path: "", redirectTo: "/menu", pathMatch: "full" },
    { path: "menu", component: MenuComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
