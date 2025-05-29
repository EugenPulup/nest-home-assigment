import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '@/modules/task/dto/create-task.dto';
import { UpdateTaskDto } from '@/modules/task/dto/update-task.dto';
import { TaskRepository } from '@/modules/task/repositories/task.repositories';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.taskRepository.create({ ...createTaskDto, userId });
  }

  findAll(userId: number) {
    return this.taskRepository.findAll({ userId });
  }

  search(searchTaskDto: SearchTaskDto, userId: number) {
    const { query } = searchTaskDto;

    if (!query || query.trim() === '') {
      return this.findAll(userId);
    }

    return this.taskRepository.search(userId, query);
  }

  findOne(id: number) {
    return this.taskRepository.findById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
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
