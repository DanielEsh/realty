import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RealtyObjectModule } from './modules/realty-object/realty-object.module';

@Module({
  imports: [PrismaModule, RealtyObjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
