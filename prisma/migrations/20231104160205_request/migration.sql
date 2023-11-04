-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_realtyObjectId_fkey";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "realtyObjectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_realtyObjectId_fkey" FOREIGN KEY ("realtyObjectId") REFERENCES "RealtyObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
