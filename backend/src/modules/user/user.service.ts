import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail({ id, email }: { id?: number; email?: string }) {
    try {
      const conditional = { id, email };
      return await this.userRepository.findOneOrFail({
        where: conditional,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ id });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.findOneOrFail({ id });
    this.userRepository.softDelete({ id });
  }
}
