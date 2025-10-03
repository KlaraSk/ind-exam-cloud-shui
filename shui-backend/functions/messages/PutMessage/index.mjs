import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { validateMessage } from "../../../middlewares/validateMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { validateId } from "../../../middlewares/validateId.mjs";
import { getMessageById, updateMessage } from "../../../services/messages.mjs";

export const handler = middy(async (event) => {
  const id = event.pathParameters.id;
  const newContent = event.body;
  const message = await getMessageById(id);

  // Om den inloggade usern är samma som meddelandets user --> fortsätt.
  if (event.user.PK === message.PK) {
    const newMessage = await updateMessage(message, newContent);
    return sendResponse(200, { message: "Update successfull", data: newMessage });
  } else throw new Error("Unauthorized user or invalid message id");
})
  .use(authenticateUser())
  .use(validateId())
  .use(httpJsonBodyParser())
  .use(validateMessage())
  .use(errorHandler());
