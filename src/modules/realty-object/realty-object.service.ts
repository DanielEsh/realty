import { Injectable } from '@nestjs/common';
import { Benefit, Prisma, RealtyObjectType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';

interface findAllParams {
  offset?: number;
  limit?: number;
  minFloor?: number;
  maxFloor?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  benefits?: Benefit['id'][];
  furnish?: number;
  property?: number;
  rooms?: any;
  type?: string[];
  sort?: string;
  order?: 'asc' | 'desc';
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
    const realtyObjects = await this.prisma.realtyObject.findMany({
      take: params?.limit,
      skip: params?.offset,
      where: this.getConditionsFilter(params),
      orderBy: {
        [params.sort]: params.order,
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

    const next =
      params.offset + params.limit < totalCount
        ? params.offset + params.limit
        : null;

    const prev =
      params.offset - params.limit >= 0 ? params.offset - params.limit : null;

    const filteredRealtyObjects = realtyObjects.filter((realtyObject) => {
      if (params.benefits.length) {
        const realtyObjectBenefitsIds = realtyObject.benefits.map(
          (benefit) => benefit.benefit.id,
        );

        return params.benefits.every((benefitId) =>
          realtyObjectBenefitsIds.includes(benefitId),
        );
      }

      return realtyObject;
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
      meta: {
        totalCount,
        next,
        prev,
      },
      data: transformedRealtyObjectResponse,
    };
  }

  private getConditionsFilter(params: findAllParams) {
    const filters: Prisma.RealtyObjectWhereInput = {
      price: {
        gte: params.minPrice,
        lte: params.maxPrice,
      },
      area: {
        gte: params.minArea,
        lte: params.maxArea,
      },
      floor: {
        gte: params.minFloor,
        lte: params.maxFloor,
      },
    };

    if (params.benefits.length) {
      filters.benefits = {
        some: {
          benefitId: {
            in: params.benefits,
          },
        },
      };
    }

    if (params.furnish) {
      filters.furnish = {
        is: {
          id: params.furnish,
        },
      };
    }

    if (params.property) {
      filters.property = {
        is: {
          id: params.property,
        },
      };
    }

    if (params.rooms.length) {
      filters.rooms = {
        in: params.rooms,
      };
    }

    if (params.type.length) {
      filters.type = {
        in: params.type as RealtyObjectType[],
      };
    }

    return filters;
  }

  public async findOneById(id: number) {
    return this.prisma.realtyObject.findFirst({
      where: { id },
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
  }

  public async getSpecs() {
    const specs = await this.prisma.realtyObject.aggregate({
      _max: {
        price: true,
        area: true,
        floor: true,
      },
      _min: {
        price: true,
        area: true,
        floor: true,
      },
    });

    const rooms = await this.prisma.realtyObject.findMany({
      distinct: ['rooms'],
      select: {
        rooms: true,
      },
      orderBy: {
        rooms: 'asc',
      },
    });

    const benefits = await this.prisma.benefit.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const furnish = await this.prisma.furnish.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const property = await this.prisma.property.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      type: [
        {
          id: RealtyObjectType.FLAT,
          name: RealtyObjectType.FLAT,
        },
        {
          id: RealtyObjectType.APARTMENT,
          name: RealtyObjectType.APARTMENT,
        },
      ],
      rooms: rooms.map((room) => ({
        id: room.rooms,
        name: room.rooms,
      })),
      price: {
        min: specs._min.price,
        max: specs._max.price,
      },
      area: {
        min: specs._min.area,
        max: specs._max.area,
      },
      floor: {
        min: specs._min.floor,
        max: specs._max.floor,
      },
      furnish,
      property,
      benefits,
    };
  }
}
