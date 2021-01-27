import { Request } from 'express'

const db = require('../db/models')
class TodoService {
    credential: {
        id: number
    }
    body: Request['body']
    params: Request['params']

    constructor(req: Request) {
        this.credential = req.app.locals.credential
        this.body = req.body
        this.params = req.params
    }

    getAllTodo = async () => {
        const getAlltodos = await db.todo.findAll({
            where: { user_id: this.credential.id },
            attributes: ['id', 'description']
        })

        return getAlltodos
    }

    createTodo = async () => {

        const { description } = this.body
        const createTodo = await db.todo.create({
            user_id: this.credential.id,
            description
        })

        return createTodo
    }

    getOne = async () => {
        const { id } = this.params
        const todos = await db.todo.findOne({
            where: {
                id,
                user_id: this.credential.id
            },
        })

        return todos
    }

    updateTodo = async () => {
        const { id } = this.params
        const { description } = this.body
        const todos = await db.todo.update({ description }, {
            where: {
                id,
                user_id: this.credential.id
            },
        })

        return todos
    }

    deleteTodo = async () => {
        const { id } = this.params
        const todos = await db.todo.destroy({
            where: {
                id,
                user_id: this.credential.id
            },
        })

        return todos
    }
}

export default TodoService