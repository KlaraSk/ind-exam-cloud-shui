import { queriesSchema } from "../models/querySchema.mjs";

export const validateQueries = () => ({
  before: (handler) => {
    // Om requesten saknar queryparametrar exekveras funktionen utan validering och returnerar alla meddelanden.
    if (handler.event.queryStringParameters === null) {
      return;
    } else {
      const { error } = queriesSchema.validate(handler.event.queryStringParameters);
      if (error) throw new Error(error.details[0].message);
      return;
    }
  },
});
