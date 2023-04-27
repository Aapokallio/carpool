-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('DRIVER', 'SHOTGUN', 'BACKSEAT1', 'BACKSEAT2', 'BACKSEAT3');

-- CreateTable
CREATE TABLE "Trip"
(
    "id"           SERIAL       NOT NULL,
    "location"     TEXT         NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "description"  TEXT         NOT NULL,
    "code"         TEXT         NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car"
(
    "id"               SERIAL       NOT NULL,
    "name"             TEXT         NOT NULL,
    "startingLocation" TEXT         NOT NULL,
    "startingTime"     TIMESTAMP(3) NOT NULL,
    "seatCount"        INTEGER      NOT NULL,
    "tripId"           INTEGER      NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat"
(
    "id"          SERIAL     NOT NULL,
    "type"        "SeatType" NOT NULL,
    "carId"       INTEGER    NOT NULL,
    "passengerId" INTEGER,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger"
(
    "id"       SERIAL  NOT NULL,
    "name"     TEXT    NOT NULL,
    "isSeated" BOOLEAN NOT NULL DEFAULT false,
    "tripId"   INTEGER NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_code_key" ON "Trip" ("code");

-- AddForeignKey
ALTER TABLE "Car"
    ADD CONSTRAINT "Car_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat"
    ADD CONSTRAINT "Seat_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat"
    ADD CONSTRAINT "Seat_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger"
    ADD CONSTRAINT "Passenger_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
