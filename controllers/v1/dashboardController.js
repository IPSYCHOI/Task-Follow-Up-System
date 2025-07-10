import Task from "../../models/TaskModel.js";

export const GetAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    if (!tasks) throw new Error("No tasks found");

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
      msg: "Tasks found successfully",
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
