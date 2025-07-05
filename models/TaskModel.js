import mongoose from "mongoose";

const Taskschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Done", "In Progress", "Overdue"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


// set status before saving
Taskschema.pre("save", async function (next) {
    const dateNow = new Date();

    if (this.isCompleted) {
        this.status = "Done";
    }
    else if (this.startDate <= dateNow && dateNow <= this.endDate) {
        this.status = "In Progress";
    }
    else if (dateNow > this.endDate) {
        this.status = "Overdue";
    }
    else {
        this.status = "Overdue";
    }

    next();
})


const Task = mongoose.model("Task", Taskschema);

export default Task;