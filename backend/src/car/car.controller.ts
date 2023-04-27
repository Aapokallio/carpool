import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Car } from '../../constants';

@Controller('cars')
export class CarController {
  constructor(private prisma: PrismaService) {}

  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string): Promise<boolean> {
    return !!(await this.prisma.car.delete({
      where: {
        id: parseInt(carId, 10),
      },
    }));
  }

  @Post()
  async createCar(@Body() data: { car: Car; tripId: string }) {
    return await this.prisma.car.create({
      data: {
        name: data.car.name,
        startingLocation: data.car.startingLocation,
        seatCount: data.car.seatCount,
        startingTime: data.car.startingTime,
        seats: {
          createMany: {
            data: data.car.seats.map((seat) => {
              return {
                type: seat.type,
              };
            }),
          },
        },
        trip: {
          connect: {
            id: parseInt(data.tripId, 10),
          },
        },
      },
    });
  }
}
