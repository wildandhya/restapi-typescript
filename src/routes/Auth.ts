import BaseRoutes from './BaseRouter'

// middleware
import { auth } from '../middleware/AuthMiddleware'
import validate from '../middleware/AuthValidator'

// Controller
import AuthController from "../controllers/Auth"


class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("/register", validate, AuthController.register)
        this.router.post("/login", validate, AuthController.login)
        this.router.post("/profile", validate, AuthController.profile)
    }
}


export default new AuthRoutes().router