import Joi from "joi";

const postCommentValidator = Joi.object({
    comment: Joi.string()
        .min(1)
        .required()
});

export default postCommentValidator;

