import { Component } from '@angular/core';
import {car1, users, SeatPosition, User} from '../constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  users = users;
  car = car1;
  currentUser = this.users[0];

  addYourselfToSeat(type: SeatPosition): void {
    this.car.seats = this.car.seats.map((seat) => {
      if (seat.type === type) {
        return {
          ...seat,
          occupant: this.currentUser,
        };
      } else {
        return {
          ...seat,
        };
      }
    });
  }

  removeYourselfFromSeat(occupant: User):void {
    this.car.seats = this.car.seats.map(seat => {
      if (occupant === this.currentUser) {
        return {
          ...seat,
          occupant: null
        }
      } else {
        return {
          ...seat
        }
      }
    })
  }
}
