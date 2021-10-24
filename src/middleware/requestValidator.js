import Joi from 'joi';
import createError from 'http-errors';

const { BadRequest } = createError;

const requestValidator = (requestProperty, schema) =>
    (req, res, next) => {
        try {
            Joi.attempt(req[requestProperty], schema);
            return next();
        } catch (error) {
            const badRequest = new BadRequest(error.message);
            return next(badRequest);
        }
    };

export default requestValidator;
