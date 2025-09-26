import Joi from "joi";

export const queriesSchema = Joi.object({
  sort: Joi.string().valid("newest", "oldest"),
  user: Joi.string().alphanum().min(5).max(15),
});
