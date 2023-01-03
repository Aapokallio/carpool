export interface User {
  id: number,
  name: string,
}

export interface Car {
  seats: Seat[],
  owner: User,
  name: string
}


export interface Seat {
  occupant: User | null | string,
  type: SeatPosition
}

export type SeatPosition = 'driver' | 'shotgun' | 'backseat1' | 'backseat2'| 'backseat3'

export const users: User[] = [{
  name: 'Aapo',
  id: 1
},{
  name: 'Viltsu',
  id:2
}]

export const emptyCar: Seat[] = [{
  type:"driver",
  occupant: null
},{
  type:"shotgun",
  occupant: null
},{
  type:"backseat1",
  occupant: null
},{
  type:"backseat2",
  occupant: null
},{
  type:"backseat3",
  occupant: null
},
]


export const car1: Car = {
  owner: users[0],
  name: 'Aapon auto',
  seats: emptyCar
}

