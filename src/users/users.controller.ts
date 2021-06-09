import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {}
  @Post()
  postUsers() {}
  @Patch()
  updateUsers() {}
}
