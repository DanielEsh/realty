import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';

@Injectable()
export class RealtyObjectService {
  constructor(private prisma: PrismaService) {}

  public async create(createRealtyObjectDto: CreateRealtyObjectDto) {
    return this.prisma.realtyObject.create({
      data: {
        ...createRealtyObjectDto,
        benefits: {
          create: createRealtyObjectDto.benefits?.map((benefitId) => ({
            benefitId,
          })),
        },
      },
    });
  }

  public async findAll(cursor: number | null, take: number) {
    const realtyObjects = await this.prisma.realtyObject.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        property: {
          select: {
            id: true,
            name: true,
          },
        },
        furnish: {
          select: {
            id: true,
            name: true,
          },
        },
        benefits: {
          select: {
            benefit: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const totalCount = await this.prisma.realtyObject.count();

    const hasNextPage =
      realtyObjects.length === take && realtyObjects.length < totalCount;

    const transformedRealtyObjectResponse = realtyObjects.map(
      (realtyObject) => {
        const benefits = realtyObject.benefits.map((benefit) => ({
          id: benefit.benefit.id,
          name: benefit.benefit.name,
        }));

        return {
          ...realtyObject,
          benefits,
        };
      },
    );

    return {
      data: transformedRealtyObjectResponse,
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
