import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address/address.controller';
import { AddressService } from './service/address/address.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
