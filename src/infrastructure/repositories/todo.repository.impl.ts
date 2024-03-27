import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from '../../domain'

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly datasourse: TodoDataSource) {}
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasourse.create(createTodoDto)
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasourse.getAll()
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasourse.findById(id)
  }
  update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasourse.update(updateTodoDto)
  }
  delete(id: number): Promise<TodoEntity> {
    return this.datasourse.delete(id)
  }
}
