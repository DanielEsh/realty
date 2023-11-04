import { RequestType } from '@prisma/client';

export class CreateRequestDto {
  type: RequestType | null;
  name: string;
  phone: string;
  email: string | null;
  realtyObjectId: number | null;
}
