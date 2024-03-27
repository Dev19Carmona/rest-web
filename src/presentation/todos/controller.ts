import { Request, Response } from 'express'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from '../../domain'
export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}
  public getTodos = async (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(400).json({ error }))
  }
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }))
  }
  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) res.status(400).json({ error })

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }))
  }
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDto.update({
      ...req.body,
      id,
    })
    if (error) res.status(400).json({ error })

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }))
  }
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }))
  }
}
