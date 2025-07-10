import Task from "../../../models/TaskModel.js";
import User from "../../../models/UserModel.js";
import { NotFoundError, UnAuthorizedError } from "../../../Errors/error.js";

// Delete Task
export const DeleteTaskController = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            throw new UnAuthorizedError("User is not authorized");
        }

        const { id } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: id, isDeleted: false, user: req.user.id },
            { isDeleted: true },
            { new: true }
        );

        if (!task) {
            throw new NotFoundError("Task Not found");
        }

        res.status(200).json({
            data: task,
            message: "Task deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};
