import { RealtyObject, RealtyObjectType } from '@prisma/client';

export class RealtyObjectEntity implements RealtyObject {
  id: number;
  number: string;
  type: RealtyObjectType;
  rooms: number;
  floor: number;
  total_floors: number;
  area: number;
  plan: string;
  originalPrice: number;
  price: number;
}
