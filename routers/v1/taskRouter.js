
import {Router} from 'express';
import { GetAllTasks } from '../../controllers/v1/taskController.js';
const router = Router();
import { GetAllTasksController } from '../../controllers/v1/taskControllers/getTasksController.js';
import { GetTaskController } from '../../controllers/v1/taskControllers/getTaskController.js';
import { DeleteTaskController } from '../../controllers/v1/taskControllers/deleteTaskController.js';
import { CreateTaskController } from '../../controllers/v1/taskControllers/createTaskController.js';
import { UpdateTaskController } from '../../controllers/v1/taskControllers/updateTaskController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';


router.get('/dashboard', isAuth, GetAllTasks);
router.get('/tasks', isAuth, GetAllTasksController);
router.get('/tasks/:id', isAuth, GetTaskController);
router.delete('/tasks/:id', isAuth, DeleteTaskController);
router.post('/tasks', isAuth, CreateTaskController);
router.put('/tasks:id', isAuth, UpdateTaskController);

export { router as taskRouter };

