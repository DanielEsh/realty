export class CreateRealtyObjectDto {
  number: string;
  rooms: number;
  floor: number;
  total_floors: number;
  area: number;
  plan: string;
  originalPrice: number;
  price: number;
  propertyId: number;
  furnishId: number;
  benefits?: number[];
}
