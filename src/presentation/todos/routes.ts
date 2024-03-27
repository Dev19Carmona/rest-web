import { Router } from 'express'
import { TodosController } from './controller'
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl'
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl'

export class TodoRoutes {
  static get routes(): Router {
    
    const router = Router()
    const datasource = new TodoDataSourceImpl()
    const todoRepository = new TodoRepositoryImpl(datasource)
    const todoController = new TodosController(todoRepository)

    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodoById)
    router.post('/createTodo', todoController.createTodo)
    router.put('/:id/updateTodo', todoController.updateTodo)
    router.put('/:id/deleteTodo', todoController.deleteTodo)
    return router
  }
}
