import processEnvVar from "../utils/processEnvVariable.js";



/*
 * Error-handling middleware function.
 * This function will be called whenever an error is thrown in the application, either explicitly
 * using `next(err)` or by the framework when an unhandled error occurs.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack : processEnvVar.NODE_ENV === "development" ? err.stack : null
    })
};

export default errorHandler;