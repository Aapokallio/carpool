import {Component} from '@angular/core';
import {Car, car1, Passenger, passengers, Seat,} from '../constants';
import {CdkDragDrop,} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  passengers: Passenger[] = passengers;
  cars: Car[] = [];
  newPassengerName: string = '';
  addPassengerMode: boolean = false;

  constructor() {
    this.cars = JSON.parse(
      localStorage.getItem('cars')
        ? localStorage.getItem('cars')!
        : JSON.stringify([car1, {...car1}])
    );
  }

  drop(event: CdkDragDrop<any>): void {
    if (!event.isPointerOverContainer) {
      return;
    }
    if (!event.container.data.hasOwnProperty('seat')) {
      this.changeOrderOfPassengers(
        event.container.data,
        event.previousContainer.data
      );
    } else if (
      event.container.data.hasOwnProperty('seat') &&
      event.container.data.seat.occupant === null
    ) {
      this.addPersonToSeat(event.previousContainer.data, event.container.data);
    }
  }

  addPersonToSeat(passenger: Passenger, carAndSeat: { car: Car; seat: Seat }): void {
    this.passengers.map(dude => {
      if (dude.name === passenger.name) {
        dude.seated = true
      }
    })
    this.cars = this.cars.map((car) => {
      if (car.id === carAndSeat.car.id) {
        return {
          ...car,
          seats: car.seats.map((seat) => {
            if (seat.type === carAndSeat.seat.type) {
              return {
                ...seat,
                occupant: passenger,
              };
            } else {
              return seat;
            }
          }),
        };
      } else {
        return car;
      }
    });
  }


  removeFromSeat(seat: Seat): void {
    this.passengers.map(passenger => {
      if (passenger.name === seat.occupant!.name) {
        passenger.seated = false;
      }
    })
    seat.occupant = null;
  }

  addNewPassenger(): void {
    this.passengers.push({
      name: this.newPassengerName,
      seated: false,
    });
    this.newPassengerName = '';
    this.addPassengerMode = false;
  }

  isDuplicateName(): boolean {
    return this.passengers
      .map((passenger) => passenger.name.toLowerCase())
      .includes(this.newPassengerName.toLowerCase());
  }

  removeCar(car: Car): void {
    this.cars = this.cars.filter((listCar) => listCar.id !== car.id);
  }

  private changeOrderOfPassengers(
    firstPassenger: Passenger,
    secondPassenger: Passenger
  ): void {
    const firstIndex = this.passengers
      .map((passenger) => passenger.name)
      .findIndex((name) => firstPassenger.name === name);

    const secondIndex = this.passengers
      .map((passenger) => passenger.name)
      .findIndex((name) => secondPassenger.name === name);

    [this.passengers[firstIndex], this.passengers[secondIndex]] = [
      this.passengers[secondIndex],
      this.passengers[firstIndex],
    ];
  }

  addPersonToSeatClick(passenger: Passenger, seat: Seat): void {
    seat.occupant = passenger;
    this.passengers.map(dude => {
      if (dude === passenger) {
        dude.seated = true
      }
    })
  }

  getUnseatedPassengers(passengers: Passenger[]): Passenger[] {
    return passengers.filter(passenger => !passenger.seated)
  }

  checkIfCarIsEmpty(car: Car): boolean {
    return car.seats.every(seat => seat.occupant === null);
  }
}

