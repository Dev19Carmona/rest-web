import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes(): Router{
    const router = Router()
    router.use('/api/todos', TodoRoutes.routes)
    router.use('/api/user', UserRoutes.routes)

    return router
  }
}