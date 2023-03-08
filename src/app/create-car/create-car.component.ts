import {Component} from '@angular/core';
import {Car, fiveEmptySeats, fourEmptySeats, Seat, threeEmptySeats, twoEmptySeats,} from '../constants';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent {
  users = JSON.parse(localStorage.getItem('users')!)
  cars: Car[] = [];
  carName: string = '';
  seatCount: number = 0;
  startingTime: NgbTimeStruct = {hour: 13, minute: 15, second: 0};
  startingLocation: string = '';

  constructor(public router: Router) {
    this.cars = JSON.parse(
      localStorage.getItem('cars')
        ? localStorage.getItem('cars')!
        : JSON.stringify([])
    );
  }


  addNewCar(): void {
    this.cars.push({
      name: this.carName,
      seatCount: this.seatCount,
      startingLocation: 'Kaleva',
      startingTime: this.startingTime,
      seats: this.getCarSeats(),
      id: this.cars.length + 1
    });
    localStorage.setItem('cars', JSON.stringify(this.cars))
    localStorage.setItem('users', JSON.stringify(this.users))
    this.router.navigate(['/event'])
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
