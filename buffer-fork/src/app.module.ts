import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/Delivery.module';
import { MysqlConfigModule } from './config/MYSQLConfig.module';

@Module({
  imports: [
    MysqlConfigModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
