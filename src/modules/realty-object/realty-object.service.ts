import { Injectable } from '@nestjs/common';
import { Benefit } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';

interface findAllParams {
  cursor: number;
  take: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  benefits?: Benefit['id'][];
}

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

  public async findAll(params: findAllParams) {
    const { take, cursor, minPrice, maxPrice, minArea, maxArea, benefits } =
      params;

    console.log('PARAMS', params);

    const realtyObjects = await this.prisma.realtyObject.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        area: {
          gte: minArea,
          lte: maxArea,
        },
        benefits: {
          some: {
            benefitId: {
              in: benefits,
            },
          },
        },
      },
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

    const filteredRealtyObjects = realtyObjects.filter((realtyObject) => {
      const realtyObjectBenefitsIds = realtyObject.benefits.map(
        (benefit) => benefit.benefit.id,
      );

      return params.benefits.every((benefitId) =>
        realtyObjectBenefitsIds.includes(benefitId),
      );
    });

    const transformedRealtyObjectResponse = filteredRealtyObjects.map(
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
