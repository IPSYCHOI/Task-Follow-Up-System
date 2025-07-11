import Task from "../../../models/TaskModel.js";
// Get All Tasks
export const GetAllTasksController = async (req, res, next) => {
    try {
        //const user = await User.findById(req.user.id);
        // if (!user) {
        //     throw new UnAuthorizedError("User is not authorized");    //user found check will be in isAuth MW 
        // }

        const tasks = await Task.find({
            isDeleted: false,
            user: req.user.id
        });

        // if (tasks.length === 0) {
        //     throw new NotFoundError("No tasks found");   // we shoudnt throw error if there is no tasks
        // }

        res.status(200).json({
            message: "Tasks retrieved successfully", // switch message first
            data: tasks
        });
    }
    catch (err) {
        next(err);
    }
}
