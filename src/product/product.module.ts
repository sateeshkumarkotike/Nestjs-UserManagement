import { Module } from '@nestjs/common';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product/product.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[
    SharedModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
