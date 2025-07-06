import express from 'express'
const router = express.Router();
import userController from '../../controllers/v1/userController.js'
import { isAuth } from '../../middlewares/authMiddleware.js';


router.post('/login',isAuth,userController.login);
router.post('/signup',userController.signUp);



export default router