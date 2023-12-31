import { Controller, Get } from '@nestjs/common';

import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }
}
