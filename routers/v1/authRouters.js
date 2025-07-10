import express from 'express'
const router = express.Router();
import userController from '../../controllers/v1/userController.js'
import { isAuth } from '../../middlewares/authMiddleware.js';

router.post('/login',userController.login);
router.post('/signup',userController.signUp);
router.delete("/delete",isAuth,userController.softDelete)

export default router