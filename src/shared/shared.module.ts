import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/address/models/address.model';
import { Category } from 'src/category/models/category.model';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

@Module({
    imports:[
        SequelizeModule.forFeature([
            User,
            Category,
            Product,
            Address
        ]),
    ],
    exports:[
        SequelizeModule.forFeature([
            User,
            Category,
            Product,
            Address

        ]),
    ]
})

export class SharedModule {}
