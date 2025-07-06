import express from 'express'
const router = express.Router();
import userController from '../../controllers/v1/userController.js'
import { isAuth } from '../../middlewares/authMiddleware.js';


router.post('/login',isAuth,userController.create);
router.post('/signup',userController.signUp);



export default router