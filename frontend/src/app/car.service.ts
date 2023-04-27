import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './constants';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  deleteCar(carId: number): Observable<boolean> {
    return this.http.delete<boolean>(`api/cars/${carId}`);
  }

  createCar(car: Car, tripId: number): Observable<Car> {
    return this.http.post<Car>('api/cars', {
      car,
      tripId,
    });
  }
}
