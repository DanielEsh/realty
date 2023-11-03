-- AlterTable
ALTER TABLE "RealtyObject" ADD COLUMN     "furnishId" INTEGER;

-- CreateTable
CREATE TABLE "Furnish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Furnish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RealtyObject" ADD CONSTRAINT "RealtyObject_furnishId_fkey" FOREIGN KEY ("furnishId") REFERENCES "Furnish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
