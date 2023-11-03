import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RealtyObjectService } from './realty-object.service';
import { CreateRealtyObjectDto } from './dto/create-realty-object.dto';

@Controller('api/filter')
export class RealtyObjectController {
  constructor(private readonly realtyObjectService: RealtyObjectService) {}

  @Post()
  create(@Body() createRealtyObjectDto: CreateRealtyObjectDto) {
    return this.realtyObjectService.create(createRealtyObjectDto);
  }

  @Get()
  findAll(@Query('cursor') cursor: number | null, @Query('take') take: number) {
    return this.realtyObjectService.findAll(+cursor, +take);
  }
}
