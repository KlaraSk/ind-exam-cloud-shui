import { idSchema } from "../models/idSchema.mjs";

export const validateId = () => ({
  before: (handler) => {
    const { error } = idSchema.validate(handler.event.pathParameters);
    if (error) throw new Error(error.details[0].message);
    return;
  },
});
