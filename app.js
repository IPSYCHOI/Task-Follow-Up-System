import express from "express"
import cors from "cors"
import { corsOptions } from "./config/corsOptions.js"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"
import allRouters_v1 from "./routers/v1/index.js"
import notFound from "./middlewares/notFoundHandler.js"
const app = express();

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/v1',allRouters_v1)
app.use(notFound)
app.use(globalErrorHandler)
export default app
