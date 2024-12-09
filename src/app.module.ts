import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/service/user/user.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import 'dotenv/config';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: process.env.ACCESS_KEY,
          secretAccessKey: process.env.AKIA2INXOM7RBWFYUL6V
        },
        region: 'Global',
      },
    }),
    DatabaseModule, 
    SharedModule,
    UserModule,
    CategoryModule,
    ProductModule,
    AddressModule
    
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
