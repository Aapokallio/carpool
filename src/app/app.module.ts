import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'event',component: EventComponent }
  ]

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
