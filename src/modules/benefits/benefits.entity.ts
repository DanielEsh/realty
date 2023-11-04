import { Benefit } from '@prisma/client';

export class BenefitsEntity implements Benefit {
  public id: number;
  public name: string;
  public description: string | null;
}
