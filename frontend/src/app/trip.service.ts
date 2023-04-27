import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trip } from './constants';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>('api/trip').pipe(
      map((data) => {
        return {
          ...data,
          startingDate: new Date(data.startingDate),
        };
      })
    );
  }
}
