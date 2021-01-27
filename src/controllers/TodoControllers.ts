import { Request, Response } from 'express'
import IController from './ControllerInterface'
import TodoService from '../services/TodoService'


class TodoController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req)
        const todos = await service.getAllTodo()
        return res.send({
            data: todos,
            message: ""
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req)
        const todos = await service.createTodo()
        return res.send({
            data: todos,
            message: "todo created"
        })
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req)
        const todos = await service.getOne()
        return res.send({
            data: todos,

        })
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req)
        const todos = await service.updateTodo()
        return res.send({
            data: todos,
            message: "todo updated"
        })
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req)
        const todos = await service.deleteTodo()
        return res.send({
            data: todos,
            message: "todo deleted"
        })
    }
}

export default new TodoController()