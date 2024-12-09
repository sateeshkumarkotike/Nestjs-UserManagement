import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class IsLoginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token Not Provided');
    }

    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user = decodedUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentils');
    }
  }
}
