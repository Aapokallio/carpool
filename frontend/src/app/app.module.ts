import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CreateCarComponent } from './create-car/create-car.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { HomeComponent } from './home/home.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'events',
    component: EventsComponent,
    children: [{ path: ':id', component: EventComponent }],
  },
  { path: 'create-trip', component: CreateTripComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    CreateCarComponent,
    HomeComponent,
    CreateTripComponent,
    EventsComponent,
  ],
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
    MatToolbarModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
