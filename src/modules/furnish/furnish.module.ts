import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FurnishController } from './furnish.controller';
import { FurnishService } from './furnish.service';

@Module({
  controllers: [FurnishController],
  providers: [FurnishService],
  imports: [PrismaModule],
})
export class FurnishModule {}
