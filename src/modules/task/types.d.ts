export interface Task {
  id: number;
  name: string;
  content: string;
  userId: number;
  createdAt: Date;
}

export type CreateTask = Omit<Task, 'id' | 'userId' | 'createdAt'>;

export type UpdateTask = Omit<Task, 'id' | 'userId' | 'createdAt'>;
