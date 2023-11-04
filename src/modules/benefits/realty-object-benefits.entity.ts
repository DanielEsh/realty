import { RealtyObjectBenefit } from '@prisma/client';

export class RealtyObjectBenefitsEntity implements RealtyObjectBenefit {
  public id: number;
  public realtyObjectId: number;
  public benefitId: number;
}
