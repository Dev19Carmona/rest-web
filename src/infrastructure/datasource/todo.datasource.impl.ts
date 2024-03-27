import { prisma } from '../../data/postgres'
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from '../../domain'

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    })
    return TodoEntity.fromObject(newTodo)
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()

    return todos.map((todo) => TodoEntity.fromObject(todo))
  }
  async findById(id: number): Promise<TodoEntity> {
    const todoFound = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    })
    if (!todoFound) throw 'Todo not found'

    return TodoEntity.fromObject(todoFound)
  }
  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todoUpdated = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    })
    return TodoEntity.fromObject(todoUpdated)
  }
  async delete(id: number): Promise<TodoEntity> {
    const query = { id }
    const todoDeleted = await prisma.todo.delete({ where: query })
    return TodoEntity.fromObject(todoDeleted)
  }
}
