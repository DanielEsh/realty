import { Request, RequestType } from '@prisma/client';

export class RequestEntity implements Request {
  id: number;
  type: RequestType;
  name: string;
  phone: string;
  email: string | null;
  realtyObjectId: number | null;
}
