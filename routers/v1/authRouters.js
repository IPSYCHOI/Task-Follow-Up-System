import express from 'express'
const router = express.Router();
import userController from '../../controllers/v1/userController.js'
import { isAuth } from '../../middlewares/authMiddleware.js';
import { validateKeys } from '../../middlewares/validateKeys.js';

router.post('/login',validateKeys(["email","password"]),userController.login);
router.post('/signup',validateKeys(["email","password","password2","name"]),userController.signUp);
router.delete("/delete",isAuth,userController.softDelete)

export default router