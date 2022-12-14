import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { config } from '../../config';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];
    const verify: any = jwt.verify(
      token,
      config?.jwtAdminSecret,
      function (err, decoded) {
        if (err) {
          return false;
        }
        return decoded;
      },
    );

    if (verify?.admin?.id) {
      return true;
    }
    return false;
  }
}
