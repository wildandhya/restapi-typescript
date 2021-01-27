import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import Authentication from '../utils/Authentication'

const db = require("../db/models/index")

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body
        const hashedPassword: string = await Authentication.hash(password)
        const createUser = await db.user.create({ username, password: hashedPassword })
        return res.send("Register Success")
    }
    login = async (req: Request, res: Response): Promise<Response> => {

        // find data user by username
        let { username, password } = req.body
        const user = await db.user.findOne({
            where: { username }
        })

        // check password
        let compare = await Authentication.passwordCompare(password, user.password)

        // generate token
        if (compare) {
            let token = Authentication.generateToken(user.id, username, user.password)
            return res.send({
                token
            })
        }

        return res.send("Auth Failed")
    }

    profile = (req: Request, res: Response): Response => {
        return res.send("profile")
    }
}

export default new AuthController()