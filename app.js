import express from "express"
import cors from "cors"
import { corsOptions } from "./config/corsOptions.js"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"
import allRouters_v1 from "./routers/v1/index.js"
import { taskRouter } from "./routers/v1/taskRouter.js"

const app = express();

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/v1',allRouters_v1)
app.use((req,res,next)=>{return res.status(404).json({
    message:"not found"
})})
app.use(globalErrorHandler)
export default app