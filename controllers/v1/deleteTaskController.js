import Task from "../../models/TaskModel.js";

// Delete Task
export const DeleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: id, isDeleted: false, user: req.user._id },
            { isDeleted: true },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({
            data: task,
            message: "Task deleted successfully",
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
