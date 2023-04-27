import { Component, Inject } from '@angular/core';
import {
  Car,
  fiveEmptySeats,
  fourEmptySeats,
  Seat,
  threeEmptySeats,
  twoEmptySeats,
} from '../constants';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent {
  users = JSON.parse(localStorage.getItem('users')!);
  cars: Car[] = [];
  carName: string = '';
  seatCount: number = 0;
  startingTime: NgbTimeStruct = {
    hour: 12,
    minute: 0,
    second: 0,
  };
  startingLocation: string = '';
  tripId: number = 0;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<CreateCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date
  ) {
    console.log(this.data);
  }

  addNewCar(): void {
    this.dialogRef.close({
      name: this.carName,
      seatCount: this.seatCount,
      startingLocation: this.startingLocation,
      startingTime: this.finalizeTime(),
      seats: this.getCarSeats(),
    });
  }

  finalizeTime(): Date {
    console.log(this.data);
    console.log(typeof this.data);
    console.log(new Date(this.data));
    this.data.setHours(this.startingTime.hour, this.startingTime.minute);
    console.log(this.data);
    return this.data;
  }

  toModel(time: NgbTimeStruct | null): string | null {
    const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);
    return time != null
      ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`
      : null;
  }

  getCarSeats(): Seat[] {
    let seats: Seat[];
    if (this.seatCount === 5) {
      seats = fiveEmptySeats;
    } else if (this.seatCount === 4) {
      seats = fourEmptySeats;
    } else if (this.seatCount === 3) {
      seats = threeEmptySeats;
    } else {
      seats = twoEmptySeats;
    }
    return seats;
  }
}
