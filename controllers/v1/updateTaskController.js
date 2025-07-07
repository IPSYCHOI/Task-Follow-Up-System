import Task from "../../models/TaskModel.js";
import validator from "validator";

// update Task
export const UpdateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, startDate, endDate, isCompleted} = req.body;

        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
            return res.status(400).json({ message: "Start and end dates must be valid" });
        }

        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ message: "End date cannot be before start date" });
        }

        const task = await Task.findOne({
            _id: id,
            user: req.user._id,
            isDeleted: false
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
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
        res.status(500).json({ error: err.message });
    }
};
