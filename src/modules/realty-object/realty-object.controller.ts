import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RealtyObjectService } from './realty-object.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';
import { FilterQueryParamsDto } from './dto/filter-query-params.dto';

@Controller('api/filter')
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

    return this.realtyObjectService.findAll({
      cursor: queryParams.cursor,
      take: queryParams.take,
      minPrice: queryParams.min_price,
      maxPrice: queryParams.max_price,
      minArea: queryParams.min_area,
      maxArea: queryParams.max_area,
      benefits: queryParams.benefits?.split(',').map((item) => +item) ?? [],
      furnish: queryParams.furnish,
      property: queryParams.property,
      rooms: queryParams.benefits?.split(',').map((item) => +item) ?? [],
      type: queryParams.type?.split(',').map((item) => item.trim()) ?? [],
      sort: queryParams.sort,
      order: queryParams.order,
    });
  }
}
