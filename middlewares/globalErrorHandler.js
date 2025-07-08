const globalErrorHandler = (err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const message = err.message;
    const data = err.data
    res.status(status).json({
        message,
        data
    })
}
export default globalErrorHandler
