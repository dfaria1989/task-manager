import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './config/validation';
import { configuration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Role } from './roles/entities/role.entity';
import { SeedingService } from './seeding.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.access';
import { LocalStrategy } from './auth/local.strategy';
import { ConstantProviders } from './config/constants.provider';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { roles } from './app.roles';

const {
  jwtAccessTokenSecret,
  jwtAccessTokenExpiration,
  database: { name, host, password, port, username },
} = configuration();

@Module({
  controllers: [AuthController],
  imports: [
    AccessControlModule.forRoles(roles),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.example'],
      ignoreEnvFile: false,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: host,
      port: port,
      username: 'root',
      password: 'root',
      database: name,
      entities: [User, Task, Role],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      dropSchema: true,
    }),
    ConfigModule,
    UsersModule,
    TasksModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtAccessTokenSecret,
      signOptions: { expiresIn: jwtAccessTokenExpiration },
    }),
  ],
  providers: [...ConstantProviders, SeedingService, AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy]
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
