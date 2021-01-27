import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        res.status(401).send("not authenticated")
    }

    let secretKey = process.env.SECRET_KEY || "secret"
    const token: string | undefined = req.headers.authorization?.split(" ")[1]

    try {
        if (token) {
            const credential: string | object = jwt.verify(token, secretKey)
            if (credential) {
                req.app.locals.credential = credential
                return next()
            }
            return res.send("token invalid")
        }
        throw new Error("Token Error")

    } catch (error) {
        return res.send(error)
    }
}