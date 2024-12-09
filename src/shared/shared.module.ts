import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';

@Module({
    imports:[
        SequelizeModule.forFeature([
            User
        ]),
    ],
    exports:[
        SequelizeModule.forFeature([
            User
        ]),
    ]
})
export class SharedModule {}
