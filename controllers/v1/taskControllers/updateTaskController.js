import Task from "../../../models/TaskModel.js";
import taskValidator, { iscompleted } from "../../../validations/taskValidation.js";

import {
    BadRequestError,
    NotFoundError
} from "../../../Errors/error.js";

// Update Task
export const UpdateTaskController = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, startDate, endDate, isCompleted } = req.body;
    const validationArray=[]
        validationArray.push(taskValidator.isTitle(title))
        validationArray.push(taskValidator.isDes(description))
        validationArray.push(taskValidator.isDate(startDate,endDate,true))
        validationArray.push(taskValidator.iscompleted(iscompleted))
        for(const v of validationArray){
            if(v!==true){
                throw new BadRequestError(v)
            }
        }
    try {
        // const user = await User.findById(req.user.id);

        // if (!user) {
        //     throw new UnAuthorizedError("User is not authorized"); // user check in isAuth mw
        // }


        // if (!title || !description || !startDate || !endDate) {
        //     throw new BadRequestError("All fields are required");
        // }

        // if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
        //     throw new BadRequestError("Start and end dates must be valid");  // validation done up
        // }

        // if (new Date(endDate) < new Date(startDate)) {
        //     throw new BadRequestError("End date cannot be before start date");
        // }

        const task = await Task.findOne({
            _id: id,
            user: req.user.id,
            isDeleted: false
        });

        if (!task) {
            throw new NotFoundError("Task not found");
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
        next(err);
    }
}
