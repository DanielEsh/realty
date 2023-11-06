import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './create-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  async findAll() {
    return this.requestService.findAll();
  }
}
