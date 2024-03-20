import { Request, Response } from 'express'
interface Todo {
  id: number
  text: string
  createdAt: number
  updatedAt?: number
  completedAt?: number
}
const todos: Todo[] = [
  { id: 1, text: 'Buy Milk', createdAt: new Date().getTime() },
  { id: 2, text: 'Buy Bread', createdAt: new Date().getTime() },
  { id: 3, text: 'Buy Tomato', createdAt: new Date().getTime() },
]
export class TodosController {
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    try {
      return res.json(todos)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public getTodoById = (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const _id = parseFloat(id)

      if (isNaN(_id)) throw new Error('INVALID_ID')

      const todoFound = todos.find((todo) => todo.id === _id)
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
  public createTodo = (req: Request, res: Response) => {
    try {
      const { text } = req.body
      const newTodo = {
        id: todos.length + 1,
        text,
        createdAt: new Date().getTime(),
      }

      todos.push(newTodo)

      return res.status(200).json(newTodo)
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public updateTodo = (req: Request, res: Response) => {
    try {
      const { text, completedAt } = req.body
      const id = +req.params.id
      const index = todos.findIndex((todo) => todo.id === id)
      if (!!index) throw new Error('TODO_NOT_FOUND')
      todos.forEach((todo) => {
        if (todo.id === id) {
          todo.text = text || todo.text
          todo.completedAt = new Date(completedAt).getTime() || undefined
          todo.updatedAt = new Date().getTime()
        }
      })

      return res.status(200).json({ idUpdated: id })
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
  public deleteTodo = (req: Request, res: Response) => {
    try {
      const id = +req.params.id
      const index = todos.findIndex((todo) => todo.id === id)
      if (!!index) throw new Error(`TODO_WITH_ID:${id}_NOT_FOUND`)
      todos.splice(index, 1)

      return res.status(200).json(todos[index])
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message })
      } else {
        return res.status(404).json({ error })
      }
    }
  }
}
