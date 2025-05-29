import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { CurrentUserId } from '@/modules/user/decorators/user.decorator';
import { SearchTaskDto } from './dto/search-task.dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUserId() userId: number,
  ) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Get('search')
  search(
    @Query() searchTaskDto: SearchTaskDto,
    @CurrentUserId() userId: number,
  ) {
    return this.taskService.search(searchTaskDto, userId);
  }

  @Get()
  findAll(@CurrentUserId() userId: number) {
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() userId: number,
  ) {
    return this.taskService.remove(id, userId);
  }
}
