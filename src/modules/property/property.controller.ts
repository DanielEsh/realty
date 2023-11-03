import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './create-property.dto';

@Controller('api/property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  async findAll() {
    return this.propertyService.findAll();
  }
}
