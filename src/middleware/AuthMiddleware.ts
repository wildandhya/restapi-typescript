import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        res.status(401).send("not authenticated")
    }

    let secretKey = process.env.SECRET_KEY || "secret"
    // const token: string = req.headers.authorization?.split(" ")[1]

    try {
        const credential: string | object = jwt.verify(token, secretKey)
        if (credential) {
            next()
        }
        return res.send("token invalid")
    } catch (error) {
        return res.send(error)
    }
}