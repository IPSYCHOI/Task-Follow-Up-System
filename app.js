import express from "express"

import cors  from "cors"
import globalErrorHandler from "./middlewares/globalErrorHandler.js"
const app =express()


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(globalErrorHandler)
export default app
