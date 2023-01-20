import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EventComponent} from './event/event.component';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {CreateCarComponent} from './create-car/create-car.component';

const routes: Routes = [
  {path: 'event', component: EventComponent},
  {path: 'create-car', component: CreateCarComponent},
];

@NgModule({
  declarations: [AppComponent, EventComponent, CreateCarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RouterOutlet,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
