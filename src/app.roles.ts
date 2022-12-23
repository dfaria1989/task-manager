import { RolesBuilder } from 'nest-access-control';
export enum AppRoles {
  TECHNICIAN = 'technician',
  MANAGER = 'manager',
}
export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(AppRoles.MANAGER)
  .createAny('tasks')
  .deleteAny('tasks')
  .readAny('tasks')
  .updateAny('tasks')
  .grant(AppRoles.TECHNICIAN)
  .updateOwn('tasks')
  .createOwn('tasks')
  .readOwn('tasks');
