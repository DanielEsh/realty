import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [PrismaModule],
})
export class RequestModule {}
