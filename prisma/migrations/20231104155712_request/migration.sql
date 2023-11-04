/*
  Warnings:

  - The primary key for the `RealtyObjectBenefit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RealtyObjectBenefit` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('BOOKING', 'CALLBACK');

-- AlterTable
ALTER TABLE "RealtyObjectBenefit" DROP CONSTRAINT "RealtyObjectBenefit_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RealtyObjectBenefit_pkey" PRIMARY KEY ("realtyObjectId", "benefitId");

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "type" "RequestType" NOT NULL DEFAULT 'CALLBACK',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "realtyObjectId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_realtyObjectId_fkey" FOREIGN KEY ("realtyObjectId") REFERENCES "RealtyObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
