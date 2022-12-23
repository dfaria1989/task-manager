import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum RoleDescription {
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
}

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: RoleDescription, type: 'enum' })
  name: string;

  @OneToMany((type) => User, (user) => user.id)
  users: User[];
}
