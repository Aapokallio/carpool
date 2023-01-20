import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

export interface User {
  id: number;
  name: string;
  seated: boolean;
  real: boolean;
}

export interface Car {
  seats: Seat[];
  owner: User;
  name: string;
  startingLocation: string;
  startingTime: NgbTimeStruct;
  seatCount: number;
}

export interface Seat {
  occupant: User | null;
  type: SeatPosition;
}

export type SeatPosition =
  | 'driver'
  | 'shotgun'
  | 'backseat1'
  | 'backseat2'
  | 'backseat3';

export const users: User[] = [
  {
    name: 'Aapo',
    id: 1,
    seated: false,
    real: true,
  },
  {
    name: 'Viltsu',
    id: 2,
    seated: false,
    real: true,
  },
];

export const fiveEmptySeats: Seat[] = [
  {
    type: 'driver',
    occupant: null,
  },
  {
    type: 'shotgun',
    occupant: null,
  },
  {
    type: 'backseat1',
    occupant: null,
  },
  {
    type: 'backseat2',
    occupant: null,
  },
  {
    type: 'backseat3',
    occupant: null,
  },
];

export const fourEmptySeats: Seat[] = [
  {
    type: 'driver',
    occupant: null,
  },
  {
    type: 'shotgun',
    occupant: null,
  },
  {
    type: 'backseat1',
    occupant: null,
  },
  {
    type: 'backseat2',
    occupant: null,
  },
];

export const threeEmptySeats: Seat[] = [
  {
    type: 'driver',
    occupant: null,
  },
  {
    type: 'shotgun',
    occupant: null,
  },
  {
    type: 'backseat1',
    occupant: null,
  },
];

export const twoEmptySeats: Seat[] = [
  {
    type: 'driver',
    occupant: null,
  },
  {
    type: 'shotgun',
    occupant: null,
  },
];

export const car1: Car = {
  owner: users[0],
  name: 'Aapon auto',
  seats: fiveEmptySeats,
  seatCount: 5,
  startingLocation: 'Kaleva',
  startingTime: {hour: 13, minute: 30, second: 0},
};
