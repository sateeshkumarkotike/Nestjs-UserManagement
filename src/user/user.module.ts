import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
