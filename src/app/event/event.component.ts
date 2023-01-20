import {Component} from '@angular/core';
import {Car, car1, SeatPosition, User, users,} from '../constants';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  users: User[] = users;
  cars: Car[] = [car1, {...car1}];
  currentUser: User = this.users[0];
  carName: string = '';
  needRide: User[] = [];
  driveYourself: boolean = false;
  additionalPassengers: boolean = false;
  seatCount: number = 0;
  startingTime: NgbTimeStruct = {hour: 13, minute: 15, second: 0};
  additionalPassengerNames: string[] = [];
  passengerName: string = '';
  startingLocation: string = '';

  constructor() {
    this.cars.map((car) => {
      car.seats.map((seat) => {
        if (seat.type === 'driver') {
          seat.occupant = this.users[1];
        }
      });
    });
  }

  addYourselfToSeat(type: SeatPosition, car: Car): void {
    car.seats = car.seats.map((seat) => {
      if (seat.type === type) {
        this.currentUser.seated = true;
        this.needRide = this.needRide.filter(
          (user) => user !== this.currentUser
        );
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

  removeYourselfFromSeat(car: Car): void {
    car.seats = car.seats.map((seat) => {
      if (seat.occupant === this.currentUser) {
        this.currentUser.seated = false;
        return {
          ...seat,
          occupant: null,
        };
      } else {
        return {
          ...seat,
        };
      }
    });
  }

  insertOrRemoveNeedRide() {
    if (this.needRide.includes(this.currentUser)) {
      this.needRide = this.needRide.filter((user) => user !== this.currentUser);
    } else {
      this.needRide.push(this.currentUser);
    }
  }
}
