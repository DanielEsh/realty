import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePropertyDto } from './create-property.dto';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  public async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({ data: createPropertyDto });
  }

  public async findAll() {
    return this.prisma.property.findMany();
  }
}
