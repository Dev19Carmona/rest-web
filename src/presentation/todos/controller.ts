import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
export class TodosController {
  constructor() {}
  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await prisma.todo.findMany()
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

      if (isNaN(id)) throw new Error('INVALID_ID')
      console.log(id)

      const todoFound = await prisma.todo.findUnique({
        where: {
          id: id,
        },
      })

      if (!todoFound) throw new Error('TODO_NOT_FOUND')

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
      if(error) throw new Error(error)
      
      const newTodo = await prisma.todo.create({
        data: createTodoDto!,
      })
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
      if(error) throw new Error(error)

      const query = { id }
      const todoUpdated = await prisma.todo.update({
        where: query,
        data: updateTodoDto!.values,
      })

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
      const query = { id }
      const todoDeleted = await prisma.todo.delete({ where: query });
      (todoDeleted) 
      ? res.status(200).json(todoDeleted)
      : res.status(404).json({error:'Todo not found'})
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
}
