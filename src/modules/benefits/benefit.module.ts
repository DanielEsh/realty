import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { BenefitController } from './benefit.controller';

@Module({
  controllers: [BenefitController],
  providers: [BenefitsService],
  imports: [PrismaModule],
})
export class BenefitModule {}
