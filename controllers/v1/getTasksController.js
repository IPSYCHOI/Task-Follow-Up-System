import Task from "../../models/TaskModel.js";

// Get All Tasks
export const GetAllTasksController = async (req, res) => {
    try {
        const tasks = await Task.find({
            isDeleted : false,
            user: req.user._id
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }

        res.status(200).json({
            data: tasks,
            message: "Tasks retrieved successfully",
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
