import {Router} from 'express';
import { GetAllTasks } from '../../controllers/v1/dashboardController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';
const router = Router();
router.get('/dashboard',isAuth,GetAllTasks);
export {router as taskRouter};