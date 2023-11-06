import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBenefitDto } from './create-benefit.dto';
import { BenefitsService } from './benefits.service';

@Controller('benefit')
export class BenefitController {
  constructor(private readonly benefitService: BenefitsService) {}

  @Post()
  create(@Body() createBenefitDto: CreateBenefitDto) {
    return this.benefitService.create(createBenefitDto);
  }

  @Get()
  async findAll() {
    return this.benefitService.findAll();
  }
}
