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
  startingTime: Date;
  seatCount: number;
  id: number;
}

export interface Seat {
  occupant: Passenger | null;
  type: SeatPosition;
  id: number;
}

export interface Passenger {
  id: number;
  isSeated: boolean;
  name: string;
}

export type SeatPosition =
  | 'DRIVER'
  | 'SHOTGUN'
  | 'BACKSEAT1'
  | 'BACKSEAT2'
  | 'BACKSEAT3';

export const fiveEmptySeats: Seat[] = [
  {
    type: 'DRIVER',
    occupant: null,
    id: 0,
  },
  {
    type: 'SHOTGUN',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT1',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT2',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT3',
    occupant: null,
    id: 0,
  },
];

export const fourEmptySeats: Seat[] = [
  {
    type: 'DRIVER',
    occupant: null,
    id: 0,
  },
  {
    type: 'SHOTGUN',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT1',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT2',
    occupant: null,
    id: 0,
  },
];

export const threeEmptySeats: Seat[] = [
  {
    type: 'DRIVER',
    occupant: null,
    id: 0,
  },
  {
    type: 'SHOTGUN',
    occupant: null,
    id: 0,
  },
  {
    type: 'BACKSEAT1',
    occupant: null,
    id: 0,
  },
];

export const twoEmptySeats: Seat[] = [
  {
    type: 'DRIVER',
    occupant: null,
    id: 0,
  },
  {
    type: 'SHOTGUN',
    occupant: null,
    id: 0,
  },
];
