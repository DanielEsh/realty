/*
  Warnings:

  - Added the required column `propertyId` to the `RealtyObject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RealtyObject" ADD COLUMN     "propertyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RealtyObject" ADD CONSTRAINT "RealtyObject_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
