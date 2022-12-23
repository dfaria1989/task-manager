import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findBy(data: User | any) {
    return await this.usersRepository.findBy(data);
  }

  async findUserRole(username: string | any) {
    return await this.usersRepository.find({
      relations: ['role'],
      where: { username },
      select: ['username', 'id', 'password'],
    });
  }

  async findUserRoleById(id: string | any) {
    return await this.usersRepository.find({
      relations: ['role'],
      where: { id: id },
      select: ['username', 'id', 'updatedAt'],
    });
  }
}
