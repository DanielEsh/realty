/*
  Warnings:

  - You are about to alter the column `originalPrice` on the `RealtyObject` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `price` on the `RealtyObject` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "RealtyObject" ALTER COLUMN "originalPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
