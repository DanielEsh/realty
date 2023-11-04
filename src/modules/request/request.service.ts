import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRequestDto } from './create-request.dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  public async create(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({ data: createRequestDto });
  }

  public async findAll() {
    return this.prisma.request.findMany();
  }
}
