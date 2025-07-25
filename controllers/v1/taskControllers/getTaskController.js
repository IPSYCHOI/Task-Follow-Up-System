import Task from "../../../models/TaskModel.js";
import { NotFoundError} from "../../../Errors/error.js";

// Get Task
export const GetTaskController = async (req, res, next) => {

    const { id } = req.params;
    try {
        // const user = await User.findById(req.user.id);

        // if (!user) {
        //     throw new UnAuthorizedError("User is not authorized");  // user check in isAuth mw
        // }


        const task = await Task.findOne({
            _id: id,
            isDeleted: false,
            user: req.user.id
        });

        if (!task) {
            throw new NotFoundError("Task not found");
        }

        res.status(200).json({
            data: task,
            message: "Task retrieved successfully",
        });
    }

    catch (err) {
        next(err);
    }
} 