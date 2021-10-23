const errorHandler = handler => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        error.statusCode = error.code;
        next(error);
    }
};

export default errorHandler;
