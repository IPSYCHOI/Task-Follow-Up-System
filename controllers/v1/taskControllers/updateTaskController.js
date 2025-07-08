import Task from "../../../models/TaskModel.js";
import User from "../../../models/UserModel.js";
import validator from "validator";
import {
    BadRequestError,
    UnAuthorizedError,
    NotFoundError
} from "../../../Errors/error.js";

// Update Task
export const UpdateTaskController = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new UnAuthorizedError("User is not authorized");
        }

        const { id } = req.params;
        const { title, description, startDate, endDate, isCompleted } = req.body;

        if (!title || !description || !startDate || !endDate) {
            throw new BadRequestError("All fields are required");
        }

        if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
            throw new BadRequestError("Start and end dates must be valid");
        }

        if (new Date(endDate) < new Date(startDate)) {
            throw new BadRequestError("End date cannot be before start date");
        }

        const task = await Task.findOne({
            _id: id,
            user: req.user._id,
            isDeleted: false
        });

        if (!task) {
            throw new NotFoundError("Task not found");
        }

        task.title = title;
        task.description = description;
        task.startDate = new Date(startDate);
        task.endDate = new Date(endDate);
        task.isCompleted = isCompleted;

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            data: task
        });

    } catch (err) {
        next(err);
    }
}
