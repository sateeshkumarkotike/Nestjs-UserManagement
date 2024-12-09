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
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: 'AKIA2INXOM7RBWFYUL6V',
          secretAccessKey: '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',
        },
        region: 'Global',
      },
    }),
    DatabaseModule, 
    SharedModule,
    UserModule,
    
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
