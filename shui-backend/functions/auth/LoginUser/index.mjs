import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../../responses/index.mjs";
import { getUser } from "../../../services/users.mjs";
import { validateLogin } from "../../../middlewares/validateLogin.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { comparePassword } from "../../../utils/bcrypt.mjs";
import { generateToken } from "../../../utils/tokens.mjs";

export const handler = middy(async (event) => {
  const result = await getUser(event.body.username);

  if (result) {
    const validPassword = await comparePassword(event.body.password, result.attributes.password);

    if (validPassword) {
      const token = generateToken(result);

      return sendResponse(200, { message: "User logged in successfully.", role: result.attributes.role, token: `Bearer ${token}` });
    } else return sendResponse(401, { message: "Invalid password" });
  } else return sendResponse(404, { message: "User not found" });
})
  .use(httpJsonBodyParser())
  .use(validateLogin())
  .use(errorHandler());
