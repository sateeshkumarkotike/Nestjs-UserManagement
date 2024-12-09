import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.model';

@Injectable()
export class IsViewerGuard implements CanActivate {

  constructor(@InjectModel(User) private readonly userModel: typeof User){

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const user = await this.userModel.findOne({ where:{ id: userId } });
    if (user || user.role == 'viewer') {
      return true;
    }
    throw new UnauthorizedException('Your not Authorised to perform this action');
  }
}
