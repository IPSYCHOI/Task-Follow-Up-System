import Task from "../../models/TaskModel.js";
import validator from 'validator'

// Create Task
export const CreateTaskController = async (req, res) => {
    try {

        const { title, description, startDate, endDate } = req.body;

        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }


        if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
            return res.status(400).json({ message: "start date and end date must be valid dates" });
        }

        let start = new Date(startDate);
        let end = new Date(endDate);

        if (start > end) {
            return res.status(400).json({ message: "End date cannot be before start date" });

        }

        const task = new Task({
            title,
            description,
            startDate: start,
            endDate: end,
            user: req.user._id
        });

        await task.save();

        res.status(201).json({
            data: task,
            message: "Task created successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
