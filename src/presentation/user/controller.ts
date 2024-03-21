import { Request, Response } from 'express'
interface User {
  id:number;
  name:string;
  password?:string;
  createdAt: number ;
  updatedAt?: number;
}

const users: User[] = [
  { id: 1, name: 'Camilo', createdAt: new Date().getTime() },
  { id: 2, name: 'Carmona', createdAt: new Date().getTime() },
  { id: 3, name: 'Ramirez', createdAt: new Date().getTime() },
]
export class UserController {
  constructor() {}
  public getUser = (req: Request, res: Response) => {
    try {
      return res.json(users)
    } catch (error) {
      return res.status(404).json({ error })
    }
  }
}
