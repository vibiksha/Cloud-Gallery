import { Router } from "express";
import { handleFileUpload } from "../services/upload";
import{createUser} from "../services/user"

const router=Router();
router.post("/signup",createUser);

export { router as createUserRoutes } ;