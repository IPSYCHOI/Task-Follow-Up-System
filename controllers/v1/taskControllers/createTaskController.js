import Task from "../../../models/TaskModel.js";
import User from "../../../models/UserModel.js";
import { BadRequestError, UnAuthorizedError } from "../../../Errors/error.js";
import validator from 'validator'

// Create Task
export const CreateTaskController = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            throw new UnAuthorizedError("User is not authorized");
        }

        const { title, description, startDate, endDate } = req.body;

        if (!title || !description || !startDate || !endDate) {
            throw new BadRequestError("All fields are required");
        }


        if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
            throw new BadRequestError("Start date and end date must be valid dates");
        }

        let start = new Date(startDate);
        let end = new Date(endDate);

        if (start > end) {
            throw new BadRequestError("End date cannot be before start date");
        }

        let now = new Date();

        if (startDate < now) {
            throw new BadRequestError("Start date cannot be before today's date");
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
        next(err);
    }
};
