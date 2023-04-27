import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('trip')
export class TripController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getTrip(): Promise<any> {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id: 1,
      },
      include: {
        cars: {
          include: {
            seats: {
              include: {
                occupant: true,
              },
            },
          },
        },
        participants: true,
      },
    });
    return {
      ...trip,
      cars: trip.cars.map((car) => {
        return {
          ...car,
          seats: car.seats.map((seat) => {
            return { ...seat, occupant: (seat as any).occupant ?? null };
          }),
        };
      }),
    };
  }
}
