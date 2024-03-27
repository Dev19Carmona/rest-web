import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
import { TodoRepository } from '../../domain'
export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}
  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoRepository.getAll()
      return res.json(todos)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public getTodoById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id

      const todoFound = await this.todoRepository.findById(id)

      return res.status(200).json(todoFound)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public createTodo = async (req: Request, res: Response) => {
    try {
      const [error, createTodoDto] = CreateTodoDto.create(req.body)
      if (error) throw new Error(error)

      const newTodo = await this.todoRepository.create(createTodoDto!)
      return res.status(200).json(newTodo)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public updateTodo = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id
      const [error, updateTodoDto] = UpdateTodoDto.update({
        ...req.body,
        id,
      })
      if (error) throw new Error(error)
      const todoUpdated = await this.todoRepository.update(updateTodoDto!)

      return res.status(200).json(todoUpdated)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id
      const todoDeleted = await this.todoRepository.delete(id)
      return res.status(200).json(todoDeleted)

    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
}
