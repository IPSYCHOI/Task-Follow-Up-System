import Task from "../../../models/TaskModel.js";
import { NotFoundError } from "../../../Errors/error.js";

// Delete Task
export const DeleteTaskController = async (req, res, next) => {
    const { id } = req.params;
    try {

        // const user = await User.findById(req.user.id);

        // if (!user) {
        //     throw new UnAuthorizedError("User is not authorized");  // user check in isAuth mw
        // }


        const task = await Task.findOneAndUpdate(
            { _id: id, isDeleted: false, user: req.user.id },
            { isDeleted: true },
            { new: true }
        );

        if (!task) {
            throw new NotFoundError("Task Not found");
        }

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};
