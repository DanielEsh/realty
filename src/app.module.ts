import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RealtyObjectModule } from './modules/realty-object/realty-object.module';
import { PropertyModule } from './modules/property/property.module';
import { FurnishModule } from './modules/furnish/furnish.module';
import { BenefitModule } from './modules/benefits/benefit.module';
import { RequestModule } from './modules/request/request.module';

@Module({
  imports: [
    PrismaModule,
    RealtyObjectModule,
    PropertyModule,
    FurnishModule,
    BenefitModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
