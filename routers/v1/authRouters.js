import express from 'express'
const router = express.Router();
import userController from '../../controllers/v1/userController.js'

router.post('/login',userController.login);
router.post('/signup',userController.signUp);

export default router