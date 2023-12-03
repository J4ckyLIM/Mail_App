import { Injectable } from '@nestjs/common';

import { User } from '../domain/user/user.entity';

@Injectable()
export class MockJwtAuthGuard {
  constructor(private readonly user: User) {}

  canActivate(context: any): boolean {
    context.switchToHttp().getRequest().user = this.user;
    return true;
  }
}
