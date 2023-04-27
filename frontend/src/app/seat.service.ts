import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passenger, Seat } from './constants';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  constructor(private http: HttpClient) {}

  updateSeatPassenger(seat: Seat, passenger: Passenger) {
    return this.http.post('api/seats/update', { seat, passenger });
  }

  removeSeatPassenger(seat: Seat) {
    return this.http.post('api/seats/delete', seat);
  }

  addSeatPassenger(seat: Seat, passenger: Passenger) {
    return this.http.post('api/seats/add', { seat, passenger });
  }
}
