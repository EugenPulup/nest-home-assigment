import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto } from '@/modules/task/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/task/dto/update-task.dto';
import { TaskRepository } from '@/modules/task/repositories/task.repositories';
import { TaskEntity } from '@/modules/task/entities/task.entity';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async create(createTaskDto: CreateTaskDto, userId: number) {
    const data = await this.taskRepository.create({ ...createTaskDto, userId });

    return new TaskEntity(data);
  }

  async findAll(userId: number) {
    const data = await this.taskRepository.findAll({ userId });

    return data.map((task) => new TaskEntity(task));
  }

  async search(searchTaskDto: SearchTaskDto, userId: number) {
    const { query } = searchTaskDto;

    if (!query || query.trim() === '') {
      return this.findAll(userId);
    }

    const data = await this.taskRepository.search(userId, query);

    return data.map((task) => new TaskEntity(task));
  }

  async findOne(id: number, userId: number) {
    const data = await this.taskRepository.findById(id);

    if (!data) throw new NotFoundException('Task not found');

    if (data.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this task',
      );
    }

    return new TaskEntity(data);
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this task',
      );
    }

    if (!updateTaskDto) {
      throw new BadRequestException(
        'At least one of content or name must be provided for update',
      );
    }

    const data = await this.taskRepository.update(id, updateTaskDto);

    return new TaskEntity(data);
  }

  async remove(id: number, userId: number) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this task',
      );
    }

    const deletedRows = await this.taskRepository.deleteWhere({ id, userId });

    if (!deletedRows) {
      throw new NotFoundException(
        'Task not found or does not belong to the user',
      );
    }

    return true;
  }
}
