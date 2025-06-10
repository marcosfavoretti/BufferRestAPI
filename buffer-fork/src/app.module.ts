import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/Delivery.module';
import { SqlConfigModule } from './config/SQLConfig.module';
import { CronnModule } from './config/Cronn.module';
import { JobsModule } from './jobs/Jobs.module';
import { ExcelModule } from './modules/excel/Excel.module';

@Module({
  imports: [
    ExcelModule,
    JobsModule,
    SqlConfigModule,
    DeliveryModule,
    CronnModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
