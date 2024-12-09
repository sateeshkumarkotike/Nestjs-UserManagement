import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/models/category.model';
import { User } from 'src/user/models/user.model';

@Module({
    imports:[
        SequelizeModule.forFeature([
            User,
            Category,
            
        ]),
    ],
    exports:[
        SequelizeModule.forFeature([
            User,
            Category,
        ]),
    ]
})
export class SharedModule {}
