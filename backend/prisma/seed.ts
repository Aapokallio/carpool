import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.trip.create({
    data: {
      description: 'Mökkireissu',
      startingDate: new Date(),
      code: '123',
      location: 'Tre',
    },
  });

  await prisma.car.create({
    data: {
      name: 'auto',
      startingTime: new Date(),
      seatCount: 5,
      startingLocation: 'Kaleva',
      trip: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.seat.create({
    data: {
      type: 'DRIVER',
      car: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.seat.create({
    data: {
      type: 'SHOTGUN',
      car: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.seat.create({
    data: {
      type: 'BACKSEAT1',
      car: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.seat.create({
    data: {
      type: 'BACKSEAT2',
      car: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.seat.create({
    data: {
      type: 'BACKSEAT3',
      car: {
        connect: {
          id: 1,
        },
      },
    },
  });

  await prisma.passenger.create({
    data: {
      name: 'aapo',
      trip: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
