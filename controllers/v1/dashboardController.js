import Task from "../../models/TaskModel.js";

export const GetAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    // if (!tasks) throw new Error("No tasks found");  // we dont need to throw error if user have no tasks

    const completed = [],
      inProgress = [],
      overdue = [];
    tasks.forEach((task) => {
      if (task.status === "Done") {
        completed.push(task);
      } else if (task.status === "In Progress") {
        inProgress.push(task);
      } else {
        overdue.push(task);
      }
    });
    res.status(200).json({
      message: tasks.length==0?"No tasks found":"Tasks found successfully",   // message instead of msg  handle no tasks message
      data: {
        allTasks: tasks,
        completed: completed,
        inProgress: inProgress,
        overdue: overdue,
      },
    });
  } catch (err) {
    next(err);
  }
};
