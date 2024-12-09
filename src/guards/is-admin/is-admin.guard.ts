import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Model, where } from 'sequelize';
import { User } from 'src/user/models/user.model';

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(@InjectModel(User) private readonly userModel: typeof User){

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const user = await this.userModel.findOne({ where:{ id: userId } });
    if (user || user.role == 'admin') {
      return true;
    }
    throw new UnauthorizedException('Your not Authorised to perform this action');
  }
}
