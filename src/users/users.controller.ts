import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiResponse({ status: 201 })
  @ApiBody({
    type: CreateUserDto, // swagger
    description: 'Json structure for user object',
  })
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Delete()
  deleteUserById(@Body() dto: CreateUserDto) {
    return this.usersService.deleteUserById(dto);
  }
  @Put()
  updateUserById(@Body() dto: CreateUserDto) {
    return this.usersService.updateUserById(dto);
  }
}
