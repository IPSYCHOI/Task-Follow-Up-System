import Task from "../../../models/TaskModel.js";
import taskValidator from "../../../validations/taskValidation.js";
import { BadRequestError ,NotFoundError } from "../../../Errors/error.js";
import validator from 'validator'

// Create Task
export const CreateTaskController = async (req, res, next) => {
    const { title, description, startDate, endDate } = req.body;
    const validationArray=[]
    validationArray.push(taskValidator.isTitle(title))
    validationArray.push(taskValidator.isDes(description))
    validationArray.push(taskValidator.isDate(startDate,endDate))
    for(const v of validationArray){
        if(v!==true){
            throw new BadRequestError(v)
        }
    }
    try {

        // const user = await User.findById(req.user.id);

        // if (!user) {
        //     throw new NotFoundError("User is not found"); // user check in isAuth
        // }


        // if (!title || !description || !startDate || !endDate) {
        //     throw new BadRequestError("All fields are required");
        // }


        // if (!validator.isDate(startDate) || !validator.isDate(endDate)) {
        //     throw new BadRequestError("Start date and end date must be valid dates");
        // }

        // let start = new Date(startDate);                                                //all that validation done up befor try catch
        // let end = new Date(endDate);

        // if (start > end) {
        //     throw new BadRequestError("End date cannot be before start date");
        // }

        // let now = new Date();

        // if (startDate < now) {
        //     throw new BadRequestError("Start date cannot be before today's date");
        // }


        const task = new Task({
            title,
            description,
            startDate: start,
            endDate: end,
            user: req.user.id
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            data: task
        });
    } catch (err) {
        next(err);
    }
};
