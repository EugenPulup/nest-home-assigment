import { Injectable, NotFoundException } from '@nestjs/common';
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
    const data = await this.taskRepository.findOne({ id, userId });

    if (!data) throw new NotFoundException('User not found');

    return new TaskEntity(data);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const data = await this.taskRepository.update(id, updateTaskDto);

    return new TaskEntity(data);
  }

  async remove(id: number, userId: number) {
    const deletedRows = await this.taskRepository.deleteWhere({ id, userId });

    if (!deletedRows) {
      throw new NotFoundException(
        'Task not found or does not belong to the user',
      );
    }

    return true;
  }
}
