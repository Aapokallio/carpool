import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from './constants';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  constructor(private http: HttpClient) {}

  addPassenger(passenger: Passenger, tripId: number): Observable<Passenger> {
    return this.http.post<Passenger>('api/passengers', {
      passenger,
      tripId,
    });
  }

  deletePassenger(passengerId: number): Observable<boolean> {
    return this.http.delete<boolean>(`api/passengers/${passengerId}`);
  }
}
