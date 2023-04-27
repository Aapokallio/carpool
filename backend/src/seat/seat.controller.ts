import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Passenger, Seat } from '../../constants';

@Controller('seats')
export class SeatController {
  constructor(private prisma: PrismaService) {}

  @Post('delete')
  async removePassengerFromSeat(@Body() seat) {
    return await this.prisma.$transaction([
      this.prisma.seat.update({
        where: {
          id: seat.id,
        },
        data: {
          occupant: {
            disconnect: true,
          },
        },
      }),
      this.prisma.passenger.update({
        where: {
          id: seat.occupant.id,
        },
        data: {
          isSeated: false,
        },
      }),
    ]);
  }

  @Post('add')
  async addPassengerToSeat(@Body() data: { seat: Seat; passenger: Passenger }) {
    return await this.prisma.$transaction([
      this.prisma.seat.update({
        where: {
          id: data.seat.id,
        },
        data: {
          occupant: {
            connect: {
              id: data.passenger.id,
            },
          },
        },
      }),
      this.prisma.passenger.update({
        where: {
          id: data.passenger.id,
        },
        data: {
          isSeated: true,
        },
      }),
    ]);
  }

  // jos seatissa on jo henkilö --> disconnect
  // laita seatin occupantti nulliksi
  // päivitä henkilön isSeated falseksi
  // jos ei ole henkilöä --> connectaa henkilö seatin occupanttiin
  // laita henkilön isSeated true
  // tässä controllerissa voit kutsua kaikkia servicejä ja jaotella nämä operaatiot eri metodeiksi
}
