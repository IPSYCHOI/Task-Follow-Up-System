import {Router} from 'express';
import { GetAllTasks } from '../../controllers/v1/taskController.js';
const router = Router();
router.get('/dashboard',GetAllTasks);
export {router as taskRouter};