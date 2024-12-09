import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
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
                    models: [User],
                }),
    ],
})
export class DatabaseModule {}
