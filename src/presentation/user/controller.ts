import { Request, Response } from 'express'
interface Todo {
  id:number;
  text:string;
  createdAt: number ;
  updatedAt?: number;
}
const todos: Todo[] = [
  { id: 1, text: 'Buy Milk', createdAt: new Date().getTime() },
  { id: 2, text: 'Buy Bread', createdAt: new Date().getTime() },
  { id: 3, text: 'Buy Tomato', createdAt: new Date().getTime() },
]
export class UserController {
  constructor() {}
  public getUser = (req: Request, res: Response) => {
    try {
      return res.json(todos)
    } catch (error) {
      return res.status(404).json({ error })
    }
  }
}
