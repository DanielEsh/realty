import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFurnishDto } from './create-furnish.dto';

@Injectable()
export class FurnishService {
  constructor(private prisma: PrismaService) {}

  public async create(createFurnishDto: CreateFurnishDto) {
    return this.prisma.furnish.create({ data: createFurnishDto });
  }

  public async findAll() {
    return this.prisma.furnish.findMany();
  }
}
