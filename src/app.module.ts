import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RealtyObjectModule } from './modules/realty-object/realty-object.module';
import { PropertyModule } from './modules/property/property.module';
import { FurnishModule } from './modules/furnish/furnish.module';
import { BenefitModule } from './modules/benefits/benefit.module';

@Module({
  imports: [
    PrismaModule,
    RealtyObjectModule,
    PropertyModule,
    FurnishModule,
    BenefitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
