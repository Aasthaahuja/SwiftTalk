import express from "express"
import { userLogout, userLogin, userRegister } from "../routControllers/userroutController.js";
const router = express.Router();

router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/logout',userLogout)

export default router;