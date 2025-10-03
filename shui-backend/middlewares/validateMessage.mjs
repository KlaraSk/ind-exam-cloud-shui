import { messageSchema } from "../models/messageSchema.mjs";

export const validateMessage = () => ({
  before: (handler) => {
    const { error } = messageSchema.validate(handler.event.body);

    if (error) throw new Error(error.details[0].message);
    return;
  },
});
