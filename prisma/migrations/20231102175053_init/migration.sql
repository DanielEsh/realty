-- CreateEnum
CREATE TYPE "RealtyObjectType" AS ENUM ('FLAT', 'APARTMENT');

-- CreateTable
CREATE TABLE "RealtyObject" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "type" "RealtyObjectType" NOT NULL DEFAULT 'FLAT',
    "rooms" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "total_floors" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "plan" TEXT NOT NULL,
    "originalPrice" BIGINT NOT NULL,
    "price" BIGINT NOT NULL,

    CONSTRAINT "RealtyObject_pkey" PRIMARY KEY ("id")
);
