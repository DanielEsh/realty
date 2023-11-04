import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';
import { connect } from 'rxjs';

@Injectable()
export class RealtyObjectService {
  constructor(private prisma: PrismaService) {}

  public async create(createRealtyObjectDto: CreateRealtyObjectDto) {
    return this.prisma.realtyObject.create({
      data: createRealtyObjectDto,
    });
  }

  public async findAll(cursor: number | null, take: number) {
    const realtyObjects = await this.prisma.realtyObject.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const totalCount = await this.prisma.realtyObject.count();

    const hasNextPage =
      realtyObjects.length === take && realtyObjects.length < totalCount;

    return {
      data: realtyObjects,
      meta: {
        totalCount,
        cursor:
          realtyObjects.length > 0
            ? realtyObjects[realtyObjects.length - 1].id
            : null,
        hasNextPage,
      },
    };
  }
}
