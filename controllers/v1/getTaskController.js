import Task from "../../models/TaskModel.js";

// Get Task
export const GetTaskController = async (req, res) => {

    try {
        const { id } = req.params;

        const task = await Task.findOne({
            _id: id,
            isDeleted: false,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            data: task,
            message: "Task retrieved successfully",
        });
    }

    catch (err) {
        res.status(500).json({ error: err.message });
    }
} 