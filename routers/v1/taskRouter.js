import { Router } from 'express';
import { GetAllTasks } from '../../controllers/v1/dashboardController.js';
import { GetAllTasksController } from '../../controllers/v1/getTasksController.js';
import { GetTaskController } from '../../controllers/v1/getTaskController.js';
import { DeleteTaskController } from '../../controllers/v1/deleteTaskController.js';
import { CreateTaskController } from '../../controllers/v1/createTaskController.js';
import { UpdateTaskController } from '../../controllers/v1/updateTaskController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/dashboard', isAuth, GetAllTasks);
router.get('/tasks', isAuth, GetAllTasksController);
router.get('/tasks/:id', isAuth, GetTaskController);
router.delete('/tasks/:id', isAuth, DeleteTaskController);
router.post('/tasks', isAuth, CreateTaskController);
router.put('/tasks:id', isAuth, UpdateTaskController);

export { router as taskRouter };