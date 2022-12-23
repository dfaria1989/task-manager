import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRolesBuilder, Role, RolesBuilder } from 'nest-access-control';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
    private readonly tasksService: TasksService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user || !('role' in req.user)) throw new UnauthorizedException();
    const roles: any = this.reflector.get<string[]>('roles', context.getHandler());

    const {
      username,
      id,
      role: { name },
    } = req.user;

    if (roles[0]?.possession) {
      const { resource } = roles[0];
      const createAny = this.roleBuilder.can(name).createAny(resource).granted;
      const readAny = this.roleBuilder.can(name).readAny(resource).granted;
      const updateAny = this.roleBuilder.can(name).updateAny(resource).granted;
      const deleteAny = this.roleBuilder.can(name).deleteAny(resource).granted;

      console.log(roles);
      req.user = {
        roles: [name],
        username: username,
        permissions: { readAny: readAny, updateAny: updateAny, deleteAny: deleteAny },
        id,
      };
      return true;
    }

    throw new UnauthorizedException();
  }
}
