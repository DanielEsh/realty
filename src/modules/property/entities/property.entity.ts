import { Property } from '@prisma/client';

export class PropertyEntity implements Property {
  id: number;
  name: string;
  description: string | null;
}
