import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Roles } from './database/data/roles.data';
import { Users } from './database/data/users.data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    Users[0].password = await bcrypt.hash(Users[0].password, 10);
    Users[1].password = await bcrypt.hash(Users[1].password, 10);
    console.log(Roles)
    console.log(Users)

    await this.entityManager.save(Role, Roles);
    let setRole = { role: null };
    for (const iterator of Users) {
      const role: Role[] = await this.entityManager.findBy(Role, { name: iterator.role });
      setRole.role = role[0].id;
      await this.entityManager.save(User, { ...iterator, ...setRole });
    }
  }
}
