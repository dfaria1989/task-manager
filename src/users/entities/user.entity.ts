import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @OneToMany((type) => Task, (task) => task.id)
  tasks: Task[];

  @ManyToOne((type) => Role, (role) => role.id)
  role: Role;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
