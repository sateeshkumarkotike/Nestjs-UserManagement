import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category/category.controller';
import { CategoryService } from './service/category/category.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
