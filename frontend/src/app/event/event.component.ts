import { Component } from '@angular/core';
import { Car, Passenger, Seat, Trip } from '../constants';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { TripService } from '../trip.service';
import { CarService } from '../car.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCarComponent } from '../create-car/create-car.component';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from '../passenger.service';
import { SeatService } from '../seat.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  passengers: Passenger[] = [];
  cars: Car[] = [];
  newCar: Car | null = null;
  newPassengerName: string = '';
  addPassengerMode: boolean = false;
  trip$: Observable<Trip> | null = null;
  refreshObservable$ = new BehaviorSubject<any>(1);
  eventStartDate: Date | null = null;
  tripId: number = this.route.snapshot.params['id'];

  constructor(
    private tripService: TripService,
    private carService: CarService,
    private seatService: SeatService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private passengerService: PassengerService
  ) {
    this.trip$ = this.refreshObservable$.pipe(
      switchMap(() =>
        this.tripService
          .getTripById(1)
          .pipe(tap((data) => (this.eventStartDate = data.startingDate)))
      )
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

  addPersonToSeat(
    passenger: Passenger,
    carAndSeat: { car: Car; seat: Seat }
  ): void {
    this.passengers.map((dude) => {
      if (dude.name === passenger.name) {
        dude.isSeated = true;
      }
    });
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
    this.seatService.removeSeatPassenger(seat).subscribe((res) => {
      if (res) {
        this.refreshObservable$.next(1);
      }
    });
  }

  addNewPassenger(): void {
    this.passengerService
      .addPassenger(
        {
          name: this.newPassengerName,
          isSeated: false,
          id: 0,
        },
        this.tripId
      )
      .subscribe((result) => {
        if (result) {
          this.refreshObservable$.next(1);
          this.addPassengerMode = false;
          this.newPassengerName = '';
        }
      });
  }

  removeCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe((result) => {
      if (result) {
        this.refreshObservable$.next(1);
      }
    });
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
    this.seatService.addSeatPassenger(seat, passenger).subscribe((res) => {
      if (res) {
        this.refreshObservable$.next(1);
      }
    });
  }

  getUnseatedPassengers(passengers: Passenger[]): Passenger[] {
    return passengers.filter((passenger) => !passenger.isSeated);
  }

  checkIfCarIsEmpty(car: Car): boolean {
    return !car.seats.every((seat) => seat.occupant === null);
  }

  createCar(): void {
    const dialogRef = this.dialog.open(CreateCarComponent, {
      width: '90%',
      height: '90%',
      data: this.eventStartDate,
    });

    dialogRef.afterClosed().subscribe((car: Car) => {
      console.log(car);
      if (car) {
        this.carService.createCar(car, this.tripId).subscribe((res) => {
          if (res) {
            this.refreshObservable$.next(1);
          }
        });
      }
    });
  }

  isAlreadyInTrip(trip: Trip): boolean {
    return trip.participants
      .map((participant) => participant.name.toLowerCase())
      .includes(this.newPassengerName.toLowerCase());
  }

  deletePassenger(passengerId: number): void {
    this.passengerService.deletePassenger(passengerId).subscribe((result) => {
      if (result) {
        this.refreshObservable$.next(1);
      }
    });
  }

  isCarEmpty(car: Car): boolean {
    return car.seats.some((seat) => seat.occupant !== null);
  }
}
