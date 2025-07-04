const express = require("express")

const cors = require('cors');
const {globalErrorHandler}=require("./middlewares/globalErrorHandler")
const app =express()


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(globalErrorHandler)
exports.app=app
