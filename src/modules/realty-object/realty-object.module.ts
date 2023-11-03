import { RealtyObjectController } from './realty-object.controller';
import { RealtyObjectService } from './realty-object.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RealtyObjectController],
  providers: [RealtyObjectService],
  imports: [PrismaModule],
})
export class RealtyObjectModule {}
