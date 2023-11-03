import { Furnish } from '@prisma/client';

export class FurnishEntity implements Furnish {
  id: number;
  name: string;
  description: string | null;
}
