import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../../responses/index.mjs";
import { createUser } from "../../../services/users.mjs";
import { validateUser } from "../../../middlewares/validateUser.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = middy(async (event) => {
  const result = await createUser(event.body);

  if (result) return sendResponse(201, { message: "User created successfully." });
  else return sendResponse(404, { message: "User could not be created." });
})
  .use(httpJsonBodyParser())
  .use(validateUser())
  .use(errorHandler());
