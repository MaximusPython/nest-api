import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const result = await this.databaseService.query('SELECT * FROM users');
    return result;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, surname, age } = createUserDto;
    const result = await this.databaseService.query(
      `INSERT INTO users (name, surname, age) VALUES ($1, $2, $3) RETURNING name, surname, age`,
      [name, surname, age],
    );
    return {
      result,
      message: `Пользователь ${name} ${surname} создан`,
    };
  }

  async deleteUserById(createUserDto: CreateUserDto) {
    const { id } = createUserDto;
    const result = await this.databaseService.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );

    return {
      result,
      message: `Пользователь c id ${id} удален`,
    };
  }

  async updateUserById(createUserDto: CreateUserDto) {
    const { id, name, surname, age } = createUserDto;
    const result = await this.databaseService.query(
      `UPDATE users SET name = $2, surname = $3, age = $4 WHERE id = $1 RETURNING *`,
      [id, name, surname, age],
    );

    return {
      result,
      message: `Пользователь ${name} ${surname} изменен`,
    };
  }
}
