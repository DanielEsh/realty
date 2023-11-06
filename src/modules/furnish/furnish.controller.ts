import { Body, Controller, Get, Post } from '@nestjs/common';
import { FurnishService } from './furnish.service';
import { CreateFurnishDto } from './create-furnish.dto';

@Controller('furnish')
export class FurnishController {
  constructor(private readonly furnishService: FurnishService) {}

  @Post()
  create(@Body() createFurnishDto: CreateFurnishDto) {
    return this.furnishService.create(createFurnishDto);
  }

  @Get()
  async findAll() {
    return this.furnishService.findAll();
  }
}
