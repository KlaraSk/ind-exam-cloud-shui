import Joi from "joi";

export const messageSchema = Joi.object({
  message: Joi.string().min(5).max(250).required(),
});
