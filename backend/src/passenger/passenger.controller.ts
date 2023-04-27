import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Passenger } from '../../constants';

@Controller('passengers')
export class PassengerController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  async deletePassenger(@Param('id', ParseIntPipe) passengerId: number) {
    return await this.prisma.passenger.delete({
      where: {
        id: passengerId,
      },
    });
  }

  @Post()
  async addPassenger(@Body() data: { passenger: Passenger; tripId: string }) {
    return await this.prisma.passenger.create({
      data: {
        name: data.passenger.name,
        trip: {
          connect: {
            id: parseInt(data.tripId, 10),
          },
        },
        isSeated: false,
      },
    });
  }
}
