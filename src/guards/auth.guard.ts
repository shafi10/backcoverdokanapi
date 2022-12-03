import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { config } from 'config';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];
    const verify = jwt.verify(
      token,
      config?.jwtSecret,
      function (err, decoded) {
        if (err) {
          return false;
        }
        return decoded;
      },
    );

    if (verify?.user?.authId) {
      return true;
    }
    return false;
  }
}
