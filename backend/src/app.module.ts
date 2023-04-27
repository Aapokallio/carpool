import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TripController } from './trip/trip.controller';
import { CarController } from './car/car.controller';
import { PassengerController } from './passenger/passenger.controller';
import { SeatController } from './seat/seat.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [
    AppController,
    TripController,
    CarController,
    PassengerController,
    SeatController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
