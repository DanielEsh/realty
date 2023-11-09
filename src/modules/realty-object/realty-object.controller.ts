import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RealtyObjectService } from './realty-object.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';
import { FilterQueryParamsDto } from './dto/filter-query-params.dto';

@Controller('filter')
export class RealtyObjectController {
  constructor(private readonly realtyObjectService: RealtyObjectService) {}

  @Post()
  create(@Body() createRealtyObjectDto: CreateRealtyObjectDto) {
    return this.realtyObjectService.create(createRealtyObjectDto);
  }

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  findAll(@Query() queryParams: FilterQueryParamsDto) {
    console.log('queryParams', queryParams);

    console.log('ROOMS', queryParams.rooms);

    const getRooms = () => {
      if (!queryParams.rooms) return [];

      if (Array.isArray(queryParams.rooms)) {
        return queryParams.rooms.map((item) => +item);
      }

      return [+queryParams.rooms];
    };

    return this.realtyObjectService.findAll({
      limit: queryParams.limit,
      offset: queryParams.offset,
      minPrice: queryParams.min_price,
      maxPrice: queryParams.max_price,
      minArea: queryParams.min_area,
      maxArea: queryParams.max_area,
      minFloor: queryParams.min_floor,
      maxFloor: queryParams.max_floor,
      benefits: queryParams.benefits?.split(',').map((item) => +item) ?? [],
      furnish: queryParams.furnish,
      property: queryParams.property,
      rooms: getRooms(),
      type: queryParams.type?.split(',').map((item) => item.trim()) ?? [],
      sort: queryParams.sort,
      order: queryParams.order,
    });
  }

  @Get('/specs')
  getSpecs() {
    return this.realtyObjectService.getSpecs();
  }

  @Get('/facets')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  getFacets(@Query() queryParams: FilterQueryParamsDto) {
    return this.realtyObjectService.getFacets({
      limit: queryParams.limit,
      offset: queryParams.offset,
      minPrice: queryParams.min_price,
      maxPrice: queryParams.max_price,
      minArea: queryParams.min_area,
      maxArea: queryParams.max_area,
      minFloor: queryParams.min_floor,
      maxFloor: queryParams.max_floor,
      benefits: queryParams.benefits?.split(',').map((item) => +item) ?? [],
      furnish: queryParams.furnish,
      property: queryParams.property,
      rooms: queryParams.rooms?.split(',').map((item) => +item) ?? [],
      type: queryParams.type?.split(',').map((item) => item.trim()) ?? [],
      sort: queryParams.sort,
      order: queryParams.order,
    });
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.realtyObjectService.findOneById(+id);
  }
}
