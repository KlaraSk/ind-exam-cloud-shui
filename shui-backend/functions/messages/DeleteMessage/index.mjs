import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { validateId } from "../../../middlewares/validateId.mjs";
import { deleteMessage, getMessageById } from "../../../services/messages.mjs";

export const handler = middy(async (event) => {
  const id = event.pathParameters.id;
  const message = await getMessageById(id);

  // Om den inloggade usern är samma som meddelandets user --> fortsätt.
  if (event.user.PK === message.PK) {
    const result = await deleteMessage(message);
    // Funktionen deleteOrder() innehåller nyckeln ReturnValues: 'ALL_OLD'. Det innebär att det raderade objektet finns med i svaret från funktionen, under result.Attributes. Om result.Attributes saknas har funktionen alltså inte lyckats hitta och radera något objekt.
    if (result.Attributes) return sendResponse(200, { message: "Order deleted" });
    else return sendResponse(404, { message: "Order could not be found" });
  } else throw new Error("Unauthorized");
})
  .use(validateId())
  .use(authenticateUser())
  .use(errorHandler());
