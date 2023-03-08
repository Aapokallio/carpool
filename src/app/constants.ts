import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';


export interface Trip {
  id: number;
  name: string;
  cars: Car[];
  location: string;
  startingDate: Date;
  participants: Passenger[];
  description: string;
  code: string;
}

export interface Car {
  seats: Seat[];
  name: string;
  startingLocation: string;
  startingTime: NgbTimeStruct;
  seatCount: number;
  id: number;
}

export interface Seat {
  occupant: Passenger | null;
  type: SeatPosition;
}

export interface Passenger {
  seated: boolean,
  name: string
}

export type SeatPosition =
  | 'driver'
  | 'shotgun'
  | 'backseat1'
  | 'backseat2'
  | 'backseat3';


export const passengers: Passenger[] = [
  {
    name: 'masa',
    seated: false
  },
  {
    name: 'pera',
    seated: false
  }, {
    name: 'kerttu',
    seated: false
  },
  {
    name: 'pertti',
    seated: false
  },
  {
    name: 'moro',
    seated: false
  },
  {
    name: 'kikkeli',
    seated: false
  },
  {
    name: 'perse',
    seated: false
  },
]

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
  name: 'Aapon auto',
  seats: fiveEmptySeats,
  seatCount: 5,
  startingLocation: 'Kaleva',
  startingTime: {hour: 13, minute: 30, second: 0},
  id: 1,

};

export const mökkireissu: Trip = {
  description: 'Kiva mökkireissu poikain kanssa',
  cars: [],
  name: 'Aapon mökkireissu',
  id: 1,
  location: 'Koikeroinen',
  participants: passengers,
  startingDate: new Date(),
  code: 'lol'
}
