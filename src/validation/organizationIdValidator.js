import Joi from "joi";

const organizationIdValidator = Joi.object({
    orgId: Joi.string()
        .min(1)
        .trim()
        .required()
});

export default organizationIdValidator;
