import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { RolesAuthGuard } from 'src/auth/auth.guard';
import { CanActivate } from '@nestjs/common';
import { ACGuard } from 'nest-access-control';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTaskService = {
    findAll: jest.fn((dtop) => {
      return {
        id: 1,
        name: 'button',
        summary: 'teste',
        status: 'created',
        owner: 'josh',
      };
    }),
  };

  beforeEach(async () => {
    const mockRolesGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const mockAcguard = jest.fn(() => true);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, { provide: ACGuard, useValue: jest.fn(() => true) }],
    })
      .overrideProvider(TasksService)
      .useValue(mockTaskService)
      .overrideGuard(RolesAuthGuard)
      .useValue(mockRolesGuard)
      .overrideGuard(ACGuard)
      .useValue(mockAcguard)
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('controller be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should be defined ', async () => {
    expect(controller.findAll).toBeDefined();
  });

  it('findAll should return valid response ', async () => {
    const params = {
      user: {
        permissions: { readAny: true, updateAny: true, deleteAny: true },
        id: 1,
      },
    };
    expect(controller.findAll(params)).toEqual({
      id: expect.any(Number),
      name: 'button',
      summary: 'teste',
      status: 'created',
      owner: 'josh',
    });
  });
});
