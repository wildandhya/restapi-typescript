import express, { Application, request, Request, Response } from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { config as dotenv } from 'dotenv'

// route
import UserRoute from './routes/UserRoutes'
import AuthRoute from './routes/AuthRoutes'
import TodoRoute from './routes/TodoRoutes'

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
        dotenv()
    }
    protected plugins(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(logger('dev'))
        this.app.use(compression())
        this.app.use(helmet())
        this.app.use(cors())
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Starting Point")
        })
        this.app.use("/api/v1/users", UserRoute)
        this.app.use("/api/v1/auth", AuthRoute)
        this.app.use("/api/v1/todos", TodoRoute)


    }
}

const app = new App().app
app.listen(process.env.DB_PORT, () => {
    console.log(`Application Running at ${process.env.DB_PORT}`)
})