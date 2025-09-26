import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { getMessages, getMessagesByUser } from "../../../services/messages.mjs";
import { validateQueries } from "../../../middlewares/validateQueries.mjs";
import { sortByDate } from "../../../utils/sort.mjs";

export const handler = middy(async (event) => {
  const queries = event.queryStringParameters;

  // Inga queryparametrar --> returnerar ALLA meddelanden
  if (queries === null) {
    const data = await getMessages();
    return sendResponse(200, { message: "Data successfully retrieved", data: data });
  }
  // Sorteringsquery --> returnerar ALLA meddelanden sorterade med nyast först
  else if (queries.sort && !queries.user) {
    const data = await getMessages();
    const sortedByDate = sortByDate(data, queries);

    return sendResponse(200, { message: "Data successfully retrieved", data: sortedByDate });
  }
  // Queryparameter user --> returnerar meddelanden från en specifik användare
  else if (queries.user) {
    const data = await getMessagesByUser(queries.user);
    // Om dessutom queryparameter sort --> returnerar meddelanden från specifik användare sorterade med nyast först
    if (queries.sort) {
      const sortedByDate = sortByDate(data, queries);
      return sendResponse(200, { message: "Data successfully retrieved", data: sortedByDate });
    } else {
      return sendResponse(200, { message: "Data successfully retrieved", data: data });
    }
  } else {
    return sendResponse(404, { message: "No messages found" });
  }
})
  .use(validateQueries())
  .use(errorHandler());
