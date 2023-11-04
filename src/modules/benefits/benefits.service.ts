import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBenefitDto } from './create-benefit.dto';

@Injectable()
export class BenefitsService {
  constructor(private prisma: PrismaService) {}

  public async create(createBenefitDto: CreateBenefitDto) {
    return this.prisma.benefit.create({ data: createBenefitDto });
  }

  public async findAll() {
    return this.prisma.benefit.findMany();
  }
}
