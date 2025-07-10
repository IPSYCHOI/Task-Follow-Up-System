import express from 'express'
import authRouters from "./authRouters.js"
import {taskRouter}  from "./taskRouter.js"

const router = express.Router();

router.use("/tasks",taskRouter);
router.use("/auth",authRouters);

export default router