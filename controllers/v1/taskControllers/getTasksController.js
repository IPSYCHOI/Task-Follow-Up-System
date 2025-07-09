import Task from "../../../models/TaskModel.js";
import User from "../../../models/UserModel.js";
import { NotFoundError, UnAuthorizedError } from "../../../Errors/error.js";

// Get All Tasks
export const GetAllTasksController = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new UnAuthorizedError("User is not authorized");
        }

        const tasks = await Task.find({
            isDeleted: false,
            user: req.user._id
        });

        if (tasks.length === 0) {
            throw new NotFoundError("No tasks found");
        }

        res.status(200).json({
            data: tasks,
            message: "Tasks retrieved successfully",
        });
    }
    catch (err) {
        next(err);
    }
}
