import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { validateMessage } from "../../../middlewares/validateMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { addMessage } from "../../../services/messages.mjs";

export const handler = middy(async (event) => {
  const message = event.body.message;

  const username = event.user.attributes.username;
  console.log("username: ", username);

  const result = await addMessage(username, message);

  if (result) return sendResponse(201, { message: "Message added successfully", data: result });
})
  .use(authenticateUser())
  .use(httpJsonBodyParser())
  .use(validateMessage())
  .use(errorHandler());
