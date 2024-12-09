import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/address/models/address.model';
import { Category } from 'src/category/models/category.model';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

@Module({
    imports:[
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'admin',
            database: process.env.DB_NAME || 'postgres',  // Ensure this matches your database name
            autoLoadModels: true,
            synchronize: true,
            models: [User, Product, Category, Address],

        }),
    ],
})
export class DatabaseModule {}
