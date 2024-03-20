import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router{
    const router = Router()
    const todoController = new TodosController()
    router.get('/', todoController.getTodos )
    router.get('/:id', todoController.getTodoById )
    router.post('/createTodo', todoController.createTodo)
    router.put('/:id/updateTodo', todoController.updateTodo)
    router.put('/:id/deleteTodo', todoController.deleteTodo)
    return router
  }
}