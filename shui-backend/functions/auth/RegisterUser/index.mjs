import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../../responses/index.mjs";
import { createUser } from "../../../services/users.mjs";
import { validateUser } from "../../../middlewares/validateUser.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = middy(async (event) => {
  const result = await createUser(event.body);

  if (result === 201) return sendResponse(201, { message: "User created successfully." });
  else if (result === 404) return sendResponse(404, { message: "User could not be created." });
  else if (result === 409) return sendResponse(409, { message: "Username already exists in database." });
})
  .use(httpJsonBodyParser())
  .use(validateUser())
  .use(errorHandler());
