import { Router } from "express";
import{createUser} from "../services/user"

const router=Router();
router.post("/signup",createUser);

export { router as createUserRoutes } ;