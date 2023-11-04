-- CreateTable
CREATE TABLE "Benefit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealtyObjectBenefit" (
    "id" SERIAL NOT NULL,
    "realtyObjectId" INTEGER NOT NULL,
    "benefitId" INTEGER NOT NULL,

    CONSTRAINT "RealtyObjectBenefit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RealtyObjectBenefit" ADD CONSTRAINT "RealtyObjectBenefit_realtyObjectId_fkey" FOREIGN KEY ("realtyObjectId") REFERENCES "RealtyObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealtyObjectBenefit" ADD CONSTRAINT "RealtyObjectBenefit_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "Benefit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
