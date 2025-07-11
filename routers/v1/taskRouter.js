
import {Router} from 'express';
import { GetAllTasks } from '../../controllers/v1/dashboardController.js';
const router = Router();
import { GetAllTasksController } from '../../controllers/v1/taskControllers/getTasksController.js';
import { GetTaskController } from '../../controllers/v1/taskControllers/getTaskController.js';
import { DeleteTaskController } from '../../controllers/v1/taskControllers/deleteTaskController.js';
import { CreateTaskController } from '../../controllers/v1/taskControllers/createTaskController.js';
import { UpdateTaskController } from '../../controllers/v1/taskControllers/updateTaskController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';
import { validateKeys } from '../../middlewares/validateKeys.js';


router.get('/dashboard', isAuth, GetAllTasks);
router.get('/task', isAuth, GetAllTasksController);
router.get('/task/:id', isAuth, GetTaskController);
router.delete('/task/:id', isAuth, DeleteTaskController);
router.post('/task', validateKeys(["title","description","startDate","endDate"]), isAuth,CreateTaskController);
router.put('/task/:id',validateKeys(["title","description","startDate","endDate","isCompleted"]), isAuth, UpdateTaskController);

export { router as taskRouter };

